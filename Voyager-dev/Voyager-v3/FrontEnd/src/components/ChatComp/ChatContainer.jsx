import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { Flex, Box } from "@chakra-ui/react";
import ChatContent from "./ChatContent";
import ChatInputGroup from "./ChatInput";
import { AuthContext } from '../contexts/authContext/index';
import { auth } from '../firebase/firebase';

const ChatContainer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Access currentUser using useContext
  const { currentUser } = useContext(AuthContext);

  const handleMessageSubmit = async () => {
    setLoading(true);
  
    try {
      const token = await currentUser.getIdToken(true); // Ensure token is refreshed
  
      const userMessage = { text: prompt, role: 'user' };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid, message: prompt }),
      };
  
      const response = await fetch('http://localhost:3000/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([...messages, { text: prompt, role: 'user' }, { text: data.response, role: 'assistant' }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };
  

  const handlePromptChange = (note) => {
    setPrompt(note);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSubmit();
    }
  };

  useEffect(() => {
    if (!initialMessageSent) {
      sendInitialMessage();
      setInitialMessageSent(true);
    }
  }, [initialMessageSent]);

  const sendInitialMessage = async () => {
    setLoading(true);
    const initialMessage = "Hello";

    try {
        const token = currentUser && await currentUser.getIdToken(true); // Ensure token is refreshed

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ensure this is correctly formatted
            },
            body: JSON.stringify({ userId: currentUser.uid, message: initialMessage }),
        };

        const response = await fetch('http://localhost:3000/chat', requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages([{ text: initialMessage, role: 'user' }, { text: data.response, role: 'assistant' }]);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};


  return (
    <Flex
      flexDirection="column"
      height="50vh"
      width="50%"
      mr="300px"
      justifyContent="center"
      position="relative"
    >
      <Box flex="1" w="100%" padding="10px">
        <ChatContent messages={messages} />
      </Box>
      <ChatInputGroup
        prompt={prompt}
        setPrompt={setPrompt}
        handleKeyDown={handleKeyDown}
        handleMessageSubmit={handleMessageSubmit}
      />
    </Flex>
  );
};

export default ChatContainer;
