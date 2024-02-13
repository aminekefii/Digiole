import React from 'react';
import { VStack } from '@chakra-ui/react';
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import BuisinessCh from "./pages/BuisinessChat";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChatContainer } from '@chatscope/chat-ui-kit-react';
import BuisinessChatContainer from './components/BuisinessChatContainer';



function App() {
  return (
    
    <Router>
     
      <VStack >
        <Navbar />
     

        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/Buisinessch">
            <BuisinessCh />
          </Route>
          <Route path="/chatContainer">
            <BuisinessChatContainer/>
          </Route>
         
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </VStack>
    </Router>
  );
}

export default App;
