import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button } from '@material-ui/core';
import { importPublicKey, ab2str } from './KeyManager';
import { toClipboard } from './Utils';

export function Encrypter() {
  const [pubKeyStr, setPubKeyStr] = useState('');
  const [pubKeyHelperText, setPubKeyHelperText] = useState('');
  const [validPubKey, setValidPubKey] = useState(true);
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  function handlePubKeyChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const keyStr = event?.target.value;
    setPubKeyStr(keyStr);
    if (keyStr === '') {
      setValidPubKey(true);
      setPubKeyHelperText('');
    } else {
      importPublicKey(keyStr)
        .then((key) => {
          setValidPubKey(true);
          setPubKeyHelperText('Valid public key');
        })
        .catch((reason) => {
          setValidPubKey(false);
          setPubKeyHelperText('Invalid public key');
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
    if (pubKeyStr !== '' && validPubKey) {
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
    <Box>
      <Typography>Encrypt</Typography>
      <Box>
        <TextField
          error={!validPubKey}
          spellCheck={false}
          multiline={true}
          rows={3}
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
          placeholder="Text for encryption"
        >
          {inputText}
        </TextField>
      </Box>
      <Box>
        <Typography className="wrap">{encryptedText}</Typography>
      </Box>
      <Button
        disabled={encryptedText === ''}
        onClick={(event) => toClipboard(encryptedText)}
        variant="outlined"
      >
        Copy
      </Button>
    </Box>
  );
}
