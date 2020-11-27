import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { importPublicKey, ab2str } from './KeyManager';
import { toClipboard } from './Utils';

export function Encrypter() {
  const [pubKeyStr, setPubKeyStr] = useState('');
  const [pubKeyHelperText, setPubKeyHelperText] = useState('');
  const [pubError, setPubError] = useState(false);
  // const [inputText, setInputText] = useState('');
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
    // setInputText(text);
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
    <Card variant="outlined">
      <CardContent>
        <Box className="vspacing">
          <Typography variant="h5" component="h2">
            🔒Encrypt
          </Typography>
          <Box>
            <TextField
              error={pubError}
              spellCheck={false}
              multiline={true}
              rows={4}
              onChange={handlePubKeyChange}
              variant="outlined"
              fullWidth={true}
              label="Receivers Public Key"
              helperText={pubKeyHelperText}
            />
          </Box>
          <Box>
            <TextField
              multiline={true}
              spellCheck={false}
              rows={2}
              variant="outlined"
              onChange={handleInputChange}
              fullWidth={true}
              label="Text to encrypt"
            />
          </Box>
          <Box>
            <TextField
              disabled
              multiline={true}
              spellCheck={false}
              rows={2}
              variant="filled"
              fullWidth={true}
              label="Encrypted text"
              InputProps={{
                readOnly: true,
              }}
              value={encryptedText || ''}
            ></TextField>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <CardActions>
              <Button
                title="Copy encrypted text"
                disabled={encryptedText === ''}
                onClick={(event) => toClipboard(encryptedText)}
                variant="outlined"
              >
                Copy
              </Button>
            </CardActions>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
