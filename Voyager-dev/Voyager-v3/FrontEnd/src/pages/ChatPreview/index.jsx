import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../components/contexts/authContext/index'; 
import { doSignOut } from '../../components/firebase/auth';
import { Link, useParams } from "react-router-dom";
import ProfilePictue from 'components/ProfilePicUpdate';
import { Image, Flex, Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons'; 
import "../../styles/linebreak.css"; 

import {
  Button,
  Container,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function ChatPreview() {
  const { threadId } = useParams();
  const { currentUser } = useContext(AuthContext); 
  const [chatHistory, setChatHistory] = useState([]);
  const [photoURL, setPhotoURL] = useState(process.env.PUBLIC_URL + "/images/Profilepic.png");

  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // Get the token
        const token = await currentUser.getIdToken(true);

        // Prepare the request options with the token
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Make the GET request to fetch chat history
        const response = await axios.get(`http://localhost:3000/chatHistory/${threadId}`, requestOptions);

        // Update chat history state
        setChatHistory(response.data.chatHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    // Call the fetchChatHistory function when threadId changes
    fetchChatHistory();
  }, [threadId, currentUser]);



  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])
  
  return (
    <>
      <Helmet>
        <title>Business Plan</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <Box pb={{ md: "83px", base: "20px" }} bg="white.A700_01" w="100%">
        <Flex
          mt="-1px"
          position="relative"
          bg="indigo.A700_01"
          alignSelf="stretch"
          justifyContent="space-between"
          alignItems="center"
          gap="15px"
          p={{ base: "20px", sm: "23px" }}
        >


          <Flex ml={{ md: "20px", base: "0px" }} w="50%" justifyContent="" alignItems="" mt="10px">
            <Link to="/landingpage">
              <Image src="/images/img_voyager_icon.svg" h="32px" w="32px" />
            </Link>
            <Box h="30px" ml="20px" bg="blue_gray.100"  />
            <Text size="xl" color="gray.50" ml="3px">
              | Business Plan
            </Text>
            <Text size="xl" color="gray.400" ml={{ base: "0px", sm: "13px" }} fontWeight={300}>
              | Create/Edit with AI Wisdom
            </Text>
          </Flex>
          <Flex gap="21px" w="6%" justifyContent="center" alignItems="center">
            <ProfilePictue></ProfilePictue>
            <Button 
              size="sm"
              variant="outline"
              colorScheme="lime_100"
              color="white.A700_01"
              letterSpacing="-0.08px"
              fontWeight={500}
              minW={{ base: '50px', md: '70px' }}
              borderRadius="20px"
              _hover={{ bg: '#EAF2BB', color: 'black' }}
              fontSize={{ base: 'xs', md: 'sm' }}
              mr="50px"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Flex>
        <Container
          mt="45px"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          maxW="1341px"
          w="100%"
          gap="20px"
          px="0px"
          mx="auto"
          flexDirection={{ md: "row", base: "column" }}
          p={{ md: "", base: "20px" }}
          ml=""
        >
        



        <Flex
      flexDirection="column"
      width="100%"
      mr="300px"
      justifyContent="center"
      position="relative"
      h="100%"

    >
      <Box flex="1" w="100%" padding="10px">
        <Flex w="100%" height="60vh" overflowY="scroll">
          <Box
            ml={{ md: '34px', base: '0px' }}
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            flexDirection="column"
          >
            <Text color="black">Thread ID: {threadId}</Text>
            <Heading as="h2" fontSize="xl">Messages</Heading>
            <List spacing={3} mt={4} >
              {chatHistory.map((message, index) => (
                <ListItem key={index}>
                  <Flex mb="15px">
                  {message.role === 'assistant' ? (
                <Image src="/images/img_voyager_icon2.svg" h="17px" alignSelf="end" w="16px" />
                
              ) : (
                <Image src={photoURL} borderRadius="50%" h="20px" w="20px" />
              )}
             <Heading as="h1" ml="10px" >{message.role === 'assistant' ? 'Voyager' : 'You'}</Heading>
             </Flex>
             <List spacing={1} ml={4}>
  {Array.isArray(message.content) ? (
    message.content.map((content, index) => (
      <ListItem key={index}>
        <ListIcon as={CheckCircleIcon} color="green.500" />
        <Flex direction="column">
          {content.split('\n').map((line, idx) => (
            <Text key={idx}>{line}</Text>
          ))}
        </Flex>
      </ListItem>
    ))
  ) : (
    <ListItem className='display-linebreak'>{message.content}</ListItem>
  )}
</List>

                </ListItem>
              ))}
            </List>
          </Box>
        </Flex>
      </Box>
    </Flex>

        </Container>


      


      </Box>
    </>
  );
};
