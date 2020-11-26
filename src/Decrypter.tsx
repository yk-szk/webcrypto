import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button } from '@material-ui/core';
import { toClipboard } from './Utils';

interface Props {
  keyPair: CryptoKeyPair | null;
}

export function Decrypter(props: Props) {
  const [inputText, setInputText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const text = event?.target.value;
    setInputText(text);
    const keyPair = props.keyPair;
    if (text === '') {
      setDecryptedText('');
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
        })
        .catch((reason) => console.log(reason));
    }
  }
  return (
    <Box>
      <Typography title={props.keyPair !== null ? 'Ready' : 'Key is not set'}>
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
        >
          {inputText}
        </TextField>
      </Box>
      <Typography></Typography>
      <Box>
        <Typography className="wrap">{decryptedText}</Typography>
      </Box>
      <Button
        disabled={decryptedText === ''}
        onClick={(event) => toClipboard(decryptedText)}
        variant="outlined"
      >
        Copy
      </Button>
    </Box>
  );
}
