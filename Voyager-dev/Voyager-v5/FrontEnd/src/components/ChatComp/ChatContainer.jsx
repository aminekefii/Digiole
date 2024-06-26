import React, { useState, useEffect, useContext } from "react";
import { Flex, Box, Spinner, useToast } from "@chakra-ui/react";
import ChatContent from "./ChatContent";
import ChatInputGroup from "./ChatInput";
import { AuthContext } from '../contexts/authContext/index';

const ChatContainer = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);

  // Access currentUser user
  const { currentUser } = useContext(AuthContext);

  // Initialize toast
  const toast = useToast();

  const handleMessageSubmit = async () => {
    if (!prompt.trim()) return;  
    setLoading(true);

    try {
      const token = await currentUser.getIdToken(true); 

      const userMessage = { text: prompt, role: 'user' };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid, message: prompt }),
      };

      const response = await fetch('http://localhost:3000/api/chat/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([...messages, userMessage, { text: data.response, role: 'assistant' }]);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
    if (!initialMessageSent && currentUser) {
      sendInitialMessage();
      setInitialMessageSent(true);
    }
  }, [initialMessageSent, currentUser]);

  const sendInitialMessage = async () => {
    setLoading(true);
    const initialMessage = "Hello";

    try {
      const token = await currentUser.getIdToken(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser.uid, message: initialMessage }),
      };

      const response = await fetch('http://localhost:3000/api/chat/chat', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages([{ text: initialMessage, role: 'user' }, { text: data.response, role: 'assistant' }]);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      flexDirection="row"
      height="70vh"
      width={{ base: "100%", md: "95%" }}
      mx="auto"
      justifyContent="space-between"
      position="relative"
      p="4"
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
      <Box flex="1" w="100%" overflowY="auto" p="4" bg="white" borderRadius="md" boxShadow="sm">
        {loading && (
          <Flex justify="center" mb="4">
            <Spinner />
          </Flex>
        )}
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
