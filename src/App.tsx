import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { KeyManager } from './KeyManager';
import { Encrypter } from './Encrypter';
import { Decrypter } from './Decrypter';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [keyPair, setKeyPair] = useState(null as CryptoKeyPair | null);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header"></header>
        <Container maxWidth="md" className="vspacing">
          <Typography component="h1" variant="h2">
            Webcrypto
          </Typography>
          <KeyManager onKeyPairChange={(keyPair) => setKeyPair(keyPair)} />
          <Encrypter />
          <Decrypter keyPair={keyPair} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
