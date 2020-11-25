import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';

const isCryptoKeyPair = (
  keyPair: CryptoKey | CryptoKeyPair,
): keyPair is CryptoKeyPair => {
  return (keyPair as CryptoKeyPair).privateKey !== undefined;
};

/**
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
Convert  an ArrayBuffer into a string
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function ab2str(buf: ArrayBuffer) {
  let a = new Uint8Array(buf);
  return String.fromCharCode.apply(null, a as any);
}

function extractPemContent(pem: string, header: string, footer: string) {
  const contentStart = pem.indexOf(header);
  const contentEnd = pem.indexOf(footer);
  const pemContents = pem.substring(contentStart + header.length, contentEnd);
  return pemContents;
}

function importPrivateKey(pem: string) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = extractPemContent(pem, pemHeader, pemFooter);
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );
}

function importPublicKey(pem: string) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const pemContents = extractPemContent(pem, pemHeader, pemFooter);
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  );
}
function parseKeyPair(keyPairStr: string): Promise<CryptoKeyPair> {
  return Promise.all([
    importPrivateKey(keyPairStr),
    importPublicKey(keyPairStr),
  ]).then((keyPair) => ({ privateKey: keyPair[0], publicKey: keyPair[1] }));
}

/**
 * Open file dialog -> load text file and parse -> return keyPair
 */
function loadKeyPair(): Promise<CryptoKeyPair> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'text/plain';
    input.multiple = false;
    function fileHandler(event: Event) {
      const fileList = input.files;
      if (fileList !== null && fileList.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          const keyStr = reader.result as string;
          parseKeyPair(keyStr).then((keyPair) => resolve(keyPair));
        };
        reader.readAsText(fileList[0]);
      }
    }
    input.onchange = fileHandler;
    input.click();
  });
}

/**
 * Wrap base64 encoded contents with pem header and footer.
 */
function pemWrap(contents: string, label: string) {
  return `-----BEGIN ${label}-----\n${contents}\n-----END ${label}-----`;
}
async function exportKey(
  key: CryptoKey,
  format: 'pkcs8' | 'raw' | 'spki',
  label: string,
) {
  const exported = await window.crypto.subtle.exportKey(format, key);
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  return pemWrap(exportedAsBase64, label);
}

async function exportPrivateKey(key: CryptoKey) {
  return exportKey(key, 'pkcs8', 'PRIVATE KEY');
}

async function exportPublicKey(key: CryptoKey) {
  return exportKey(key, 'spki', 'PUBLIC KEY');
}

/**
 * Save text as a text file.
 */
function download(text: string, name: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  link.remove();
}

function emojiencode(buf: ArrayBuffer) {
  const a = Array.from(new Uint8Array(buf));
  const offset = 0x1f3f7;
  const codePoints = a.map((value) => value + offset);
  return String.fromCodePoint.apply(null, codePoints);
}

function createFingerprint(key: string) {
  return window.crypto.subtle
    .digest('SHA-256', str2ab(key))
    .then((digest) => emojiencode(digest));
}

export function KeyManager() {
  const [exportedPrivateKey, setExportedPrivateKey] = useState('');
  const [exportedPublicKey, setExportedPublicKey] = useState('');
  const [saveEnabled, setSaveEnabled] = useState(false);

  function setKeyPair(keyPair: CryptoKeyPair) {
    Promise.all([
      exportPrivateKey(keyPair.privateKey),
      exportPublicKey(keyPair.publicKey),
    ]).then((keyStrings) => {
      const [privKey, publicKey] = keyStrings;
      Promise.all([
        createFingerprint(privKey),
        createFingerprint(publicKey),
      ]).then((keys) => {
        const [priv, pub] = keys;
        setExportedPrivateKey(priv);
        setExportedPublicKey(pub);
      });
      localStorage.setItem('keyPair', publicKey + '\n' + privKey);
    });
  }
  function generateKey() {
    window.crypto.subtle
      .generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt'],
      )
      .then((keyPair) => {
        if (isCryptoKeyPair(keyPair)) {
          console.log('New key pair is generated.');
          setSaveEnabled(true);
          setKeyPair(keyPair);
        }
      });
  }
  function importKeyPair() {
    loadKeyPair().then((keyPair) => {
      setKeyPair(keyPair);
    });
  }

  useEffect(() => {
    const localKeyPair = localStorage.getItem('keyPair');
    if (localKeyPair !== null) {
      parseKeyPair(localKeyPair).then((keyPair) => {
        setKeyPair(keyPair);
      });
    }
  });
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-around">
        <Box width="30%">
          <Typography component="h3" variant="h6">
            Public Key
          </Typography>
          <Typography title="Key finterprint">{exportedPublicKey}</Typography>
          <Button
            disabled={!saveEnabled}
            variant="outlined"
            onClick={() => download(exportedPublicKey, 'PublicKey.txt')}
          >
            Save Public Key
          </Button>
        </Box>
        <Box width="30%">
          <Typography component="h3" variant="h6">
            Private Key
          </Typography>
          <Typography title="Key finterprint">{exportedPrivateKey}</Typography>
          <Button
            disabled={!saveEnabled}
            variant="outlined"
            onClick={() => download(exportedPrivateKey, 'PrivateKey.txt')}
          >
            Save Private Key
          </Button>
        </Box>
        <Box
          width="30%"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Button onClick={generateKey} variant="outlined">
            Generate Key Pair
          </Button>
          <Button onClick={importKeyPair} variant="outlined">
            Import Key Pair
          </Button>
          <Button
            disabled={!saveEnabled}
            variant="outlined"
            onClick={() =>
              download(
                exportedPublicKey + '\n' + exportedPrivateKey,
                'KeyPair.txt',
              )
            }
          >
            Save Key Pair
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
