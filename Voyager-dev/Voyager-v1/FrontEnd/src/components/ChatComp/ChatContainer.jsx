import React, { useState } from "react";
import {
  Flex,
  Input,
  Button,
  Image,
  Heading,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import ChatInputGroup from "./ChatInput";
import ChatContent from "./ChatContent";
import VoiceRec from "./VoiceRec";

const ChatContainer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessageSubmit = async () => {
    setLoading(true);

    const userMessage = { text: prompt, role: 'user' };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'your_user_id', message: prompt }),
    };

    try {
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

  return (
    <Flex
    flexDirection="column"
    height="50%"
    width="50%"
    mr="300px"
    
    justifyContent="center"
    position="relative"
  >
    <Box
      flex="1"
     w="100%"
      padding="10px"
    >
      <ChatContent messages={messages} overflowY="scroll"  />
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
