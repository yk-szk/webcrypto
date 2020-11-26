import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button } from '@material-ui/core';
import { toClipboard } from './Utils';

interface Props {
  keyPair: CryptoKeyPair | null;
}

export function Decrypter(props: Props) {
  const [inputText, setInputText] = useState('');
  const [decryptHelperText, setDecryptHelperText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [decError, setDecError] = useState(false);
  useEffect(() => {
    setDecryptHelperText(decError ? 'Invalid input or key' : '');
  }, [decError]);
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const text = event?.target.value;
    setInputText(text);
    const keyPair = props.keyPair;
    if (text === '') {
      setDecryptedText('');
      setDecError(false);
      return;
    }
    if (keyPair !== null) {
      window.crypto.subtle
        .decrypt('RSA-OAEP', keyPair.privateKey, Buffer.from(text, 'base64'))
        .then((decrypted) => {
          const result = new TextDecoder('utf-8').decode(
            new Uint8Array(decrypted),
          );
          setDecryptedText(result);
          setDecError(false);
        })
        .catch((reason) => {
          console.log(reason.name);
          setDecryptedText('');
          setDecError(true);
        });
    }
  }
  return (
    <Box className="vspacing">
      <Typography
        title={props.keyPair !== null ? 'Ready to decrypt' : 'Key is not set'}
      >
        Decrypt
        {props.keyPair !== null ? ' 🟢' : ' 🟠'}
      </Typography>
      <Box>
        <TextField
          multiline={true}
          spellCheck={false}
          rows={3}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth={true}
          placeholder="Encrypted Text"
          error={decError}
          helperText={decryptHelperText}
        >
          {inputText}
        </TextField>
      </Box>
      <Box>
        <Typography className="wrap">{decryptedText}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          title="Copy decrypted text"
          disabled={decryptedText === ''}
          onClick={(event) => toClipboard(decryptedText)}
          variant="outlined"
        >
          Copy
        </Button>
      </Box>
    </Box>
  );
}
