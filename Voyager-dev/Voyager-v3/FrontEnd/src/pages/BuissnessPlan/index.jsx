import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Image,
  Flex,
  Text,
  Box,
  Container,
  Button,
  Heading,
  Link
} from "@chakra-ui/react";
import { doSignOut } from '../../components/firebase/auth';
import Chatsidebar from "components/ChatComp/ChatSidebar";
import ChatContainer from "components/ChatComp/ChatContainer";
import ProfilePictue from 'components/ProfilePicUpdate';
import axios from "axios";

export default function Buissnessplan() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      axios.delete('http://localhost:3000/delete-files')
        .catch(error => {
          console.error('Error:', error);
        });

      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };

  return (
    <>
      <Helmet>
        <title>Buissness Plan</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <Box pb={{ md: "00px", base: "20px" }} bg="white.A700_01" w="100%">
        <Box>
          <Flex
            mt="-1px"
            position="relative"
            bg="indigo.A700_01"
            justifyContent="space-between"
            alignItems="center"
            gap="15px"
            p={{ base: "20px", sm: "23px" }}
          >
            <Flex ml={{ md: "20px", base: "0px" }} w="50%" mt="10px">
              <Link to="/landingpage">
                <Image src="/images/img_voyager_icon.svg" h="32px" w="32px" />
              </Link>
              <Box h="30px" ml="20px" bg="blue_gray.100" />
              <Text size="xl" color="gray.50" ml="3px">
                | Business Plan
              </Text>
            </Flex>
            <Flex gap="21px" w="6%" justifyContent="center" alignItems="center">
              <ProfilePictue />
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
           
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            maxW="1600px"
            w="100%"
            gap="20px"
            px="0px"
            mx="auto"
            flexDirection={{ md: "row", base: "row" }}
          >
            <Chatsidebar float="left"  />
            <Box w={{ md: "100%", base: "100%" }}  ml={{ md: "100px", base: "0" }} mt="10px">
           
              <ChatContainer />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
