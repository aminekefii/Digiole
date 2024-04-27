import React, { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import ChatContent from "./ChatContent";
import ChatInputGroup from "./ChatInput";

const ChatContainer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false); // Track if initial message has been sent

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

  useEffect(() => {
    // Send initial message only if it hasn't been sent before
    if (!initialMessageSent) {
      sendInitialMessage();
      setInitialMessageSent(true); // Update flag to indicate initial message has been sent
    }
  }, [initialMessageSent]); // Only re-run effect if initialMessageSent changes

  const sendInitialMessage = async () => {
    setLoading(true);
    const initialMessage = "Hello";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'your_user_id', message: initialMessage }),
    };

    try {
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
