import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Button, Image, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Chatsidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const filename = "buissnessplan.txt";
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/downloads/${filename}`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadCompleted(true);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const checkFileReady = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/file-ready/${filename}`);
      if (response.data.ready) {
        setFileReady(true);
      } else {
        console.log('File not ready:', response.data.error);
        setFileReady(false);
      }
    } catch (error) {
      console.error('Error checking file readiness:', error);
      setFileReady(false);
    }
  };

  useEffect(() => {
    if (!downloadCompleted) {
      const interval = setInterval(checkFileReady, 5000);
      return () => clearInterval(interval);
    }
  }, [downloadCompleted]);

  useEffect(() => {
    if (fileReady && !downloadCompleted) {
      handleDownload();
      setFileReady(false);
    }
  }, [fileReady, downloadCompleted]);

  const handleExitChat = async () => {
    const confirmExit = window.confirm("Are you sure you want to exit the chat?");
    if (confirmExit) {
      try {
        await axios.delete('http://localhost:3000/delete-files');
        navigate('/assistants');
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    }
  };

  return (
    <Flex
      direction="column"
      mt="0px"
      w={{ base: isOpen ? '170px' : '60px', md: isOpen ? '260px' : '50px' }}
      p="4"
      bg="gray.100"
      color="white"
      minH="87vh"
      transition="all 0.3s ease-in-out"
      position="relative"
      
    >
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={() => setIsOpen(!isOpen)}
        mb="4"
        alignSelf="flex-end"
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        color="black"
        pl="20px"
      />
      {isOpen && (
        <Box flex="1" w="100%">
          <Button
            variant="outline"
            colorScheme="whiteAlpha"
            color="black"
            rightIcon={<Image src="images/exit.svg" />}
            gap="4"
            mb="4"
            w="100%"
            justifyContent="flex-start"
            onClick={handleExitChat}
            as={Link}
            to="/assistants"
          >
            Exit Chat
          </Button>
          <Button
            variant="outline"
            colorScheme="whiteAlpha"
            gap="4"
            mb="4"
            w="100%"
            justifyContent="flex-start"
            color="black"
            onClick={() => window.location.reload()}
            rightIcon={<Image src="images/new.svg" />}
          >
            New chat
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Chatsidebar;
