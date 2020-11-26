import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button } from '@material-ui/core';
import { importPublicKey, ab2str } from './KeyManager';
import { toClipboard } from './Utils';

export function Encrypter() {
  const [pubKeyStr, setPubKeyStr] = useState('');
  const [pubKeyHelperText, setPubKeyHelperText] = useState('');
  const [pubError, setPubError] = useState(false);
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  useEffect(() => {
    setPubKeyHelperText(pubError ? 'Invalid public key' : '');
  }, [pubError]);
  function handlePubKeyChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const keyStr = event?.target.value;
    setPubKeyStr(keyStr);
    if (keyStr === '') {
      setPubError(false);
    } else {
      importPublicKey(keyStr)
        .then((key) => {
          setPubError(false);
        })
        .catch((reason) => {
          setPubError(true);
        });
    }
  }
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const text = event?.target.value;
    setInputText(text);
    if (text === '') {
      setEncryptedText('');
      return;
    }
    if (pubKeyStr !== '' && !pubError) {
      importPublicKey(pubKeyStr).then((key) => {
        const enc = new TextEncoder();
        const encoded = enc.encode(text);
        window.crypto.subtle
          .encrypt(
            {
              name: 'RSA-OAEP',
            },
            key,
            encoded,
          )
          .then((encrypted) => {
            const exportedAsString = ab2str(encrypted);
            const exportedAsBase64 = window.btoa(exportedAsString);
            setEncryptedText(exportedAsBase64);
          })
          .catch((error) => console.log(error));
      });
    }
  }
  return (
    <Box className="vspacing">
      <Typography>Encrypt</Typography>
      <Box>
        <TextField
          error={pubError}
          spellCheck={false}
          multiline={true}
          rows={4}
          onChange={handlePubKeyChange}
          variant="outlined"
          fullWidth={true}
          placeholder="Receivers Public Key"
          helperText={pubKeyHelperText}
        >
          {pubKeyStr}
        </TextField>
      </Box>
      <Box>
        <TextField
          multiline={true}
          spellCheck={false}
          rows={3}
          variant="outlined"
          onChange={handleInputChange}
          fullWidth={true}
          placeholder="Text to encrypt"
        >
          {inputText}
        </TextField>
      </Box>
      <Box>
        <Typography className="wrap">{encryptedText}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          title="Copy encrypted text"
          disabled={encryptedText === ''}
          onClick={(event) => toClipboard(encryptedText)}
          variant="outlined"
        >
          Copy
        </Button>
      </Box>
    </Box>
  );
}
