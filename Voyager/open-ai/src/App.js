import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

function App() {
  return (
    <Router> {/* Wrap your components with Router */}
      <div>
        <Navbar />
        <h1 className="title text-center text-darkGreen">ChatBot API</h1>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;