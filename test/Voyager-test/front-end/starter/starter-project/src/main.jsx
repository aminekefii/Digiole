import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode> 
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
