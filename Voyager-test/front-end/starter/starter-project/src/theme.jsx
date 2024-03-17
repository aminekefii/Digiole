import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // or 'light'
    useSystemColorMode: false,
  },
  // Other theme configurations...
});

export default theme;
