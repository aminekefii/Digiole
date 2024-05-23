import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../components/contexts/authContext/index';
import { doSignOut } from '../../components/firebase/auth';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading } from '@chakra-ui/react';
import ProfilePictue from 'components/ProfilePicUpdate';
import { Link } from "react-router-dom";
import {
  Text,
  Image,
  Box,
  Flex,
  Button,
  Container,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export default function ChatHistoryList() {
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        const response = await axios.get("http://localhost:3000/threads", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const threadsData = response.data.threads;
        setThreads(threadsData);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, [currentUser]);

  const deleteThread = async (threadId) => {
    try {
      const token = await currentUser.getIdToken(true);
      await axios.delete(`http://localhost:3000/threads/${threadId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Remove the deleted thread from the state
      setThreads(threads.filter(thread => thread.threadId !== threadId));
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };
  

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        const response = await axios.get(`http://localhost:3000/uploadedFiles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const filesData = response.data.files;
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>Business Plan</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <Box pb={{ md: "83px", base: "20px" }} bg="white.A700_01" w="100%">
        <Box>
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
            <Flex ml={{ md: "20px", base: "0px" }} w="50%" mt="10px">
              <Link to="/landingpage">
                <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
              </Link>
              <Box h="30px" ml="20px" bg="blue_gray.100" />
              <Text size="xl" color="gray.50" ml="3px">
                | Business Plan
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
                minW={{ base: "50px", md: "70px" }}
                borderRadius="20px"
                _hover={{ bg: "#EAF2BB", color: "black" }}
                fontSize={{ base: "xs", md: "sm" }}
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
            <Flex w={{ md: "60%", base: "100%" }} mb={{ base: "20px", md: "0" }} flexDirection="column">
              <Heading as="h1" size="lg" mb="10px" ml="20px">Chat History</Heading>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Chat ID</Th>
                      <Th>Preview</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {threads.map((thread) => (
                      <Tr key={thread.threadId}>
                        <Td>{thread.threadId}</Td>
                        <Td>
                          <Button
                            as={Link}
                            to={`/chatpreview/${thread.threadId}`}
                            size="sm"
                            variant="outline"
                            bg="blue.600"
                            color="white.A700_01"
                            letterSpacing="-0.08px"
                            fontWeight={500}
                            minW={{ base: "50px", md: "70px" }}
                            borderRadius="20px"
                            _hover={{ bg: "#EAF2BB", color: "black" }}
                            fontSize={{ base: "xs", md: "sm" }}
                            mr="10px"
                          >
                            Preview
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            size="sm"
                            variant="outline"
                            bg="red.600"
                            color="white.A700_01"
                            letterSpacing="-0.08px"
                            fontWeight={500}
                            minW={{ base: "50px", md: "70px" }}
                            borderRadius="20px"
                            _hover={{ bg: "#EAF2BB", color: "black" }}
                            fontSize={{ base: "xs", md: "sm" }}
                            mr="20px"
                            onClick={() => deleteThread(thread.threadId)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Flex w={{ md: "40%", base: "100%" }} flexDirection="column">
              <Heading as="h1" size="lg" mb="10px" ml="20px">Uploaded Files</Heading>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>File Name</Th>
                      <Th>Download URL</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {files.map((file, index) => (
                      <Tr key={index}>
                        <Td>{file.name}</Td>
                        <Td>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
}
