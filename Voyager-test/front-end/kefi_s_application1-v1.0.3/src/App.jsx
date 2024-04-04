import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme"; 
import "./styles/index.css"; 
import { AuthProvider } from "./components/contexts/authContext"; 
import Header from "components/header";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider> 
          <Routes />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
