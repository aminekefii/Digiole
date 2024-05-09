import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../components/contexts/authContext/index'; 
import { doSignOut } from '../../components/firebase/auth';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import ProfilePictue from 'components/ProfilePicUpdate';

import {
    Text,
    Image,
    Box,
    Flex,
    Button,
    Container,
  } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function ChatPreview() {
  const { threadId } = useParams();
  const { currentUser } = useContext(AuthContext); 

  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };
  useEffect(() => {
    handlePreview(threadId);
  }, []);

  const handlePreview = async (threadId) => {
    try {
     
      // Make the POST request to the threadDetails endpoint with the threadId in the URL path
      const response = await axios.post(`http://localhost:3000/threadDetails/${threadId}`);

      // Handle the response as needed
      console.log("Thread details response:", response.data);
      // You can set the response data to state or perform any other action with it here
    } catch (error) {
      console.error("Error fetching thread details:", error);
    }
  };

 // Run once when component mounts

  return (
    <>
      <Helmet>
        <title>Buissness Plan</title>
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
              <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
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
        >
          {/* Your UI elements here */}
        </Container>
      </Box>
    </>
  );
};
