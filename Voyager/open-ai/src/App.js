import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Import BrowserRouter, Switch, and Route

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch> {/* Wrap your routes with Switch */}
          <Route path="/" exact>
            <h1 className="title text-center text-darkGreen">Home Page</h1>
          </Route>
          <Route path="/chat">
            <ChatBot />
          </Route>
          <Route path="/about">
            <h1>About Page</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
