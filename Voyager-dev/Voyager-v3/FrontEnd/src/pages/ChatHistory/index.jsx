import React from "react";
import { Helmet } from "react-helmet";
import {
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Image,
  Center,
  Input,
  Button,
  Heading,
  Flex,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { doSignOut } from '../../components/firebase/auth';
import { Link } from "react-router-dom";
import ProfilePictue from 'components/ProfilePicUpdate';
import Sidebar from "components/ChatHistory/Sidebar";



export default function ChatHistoryList() {

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
              
              
              onClick={handleLogout}>Logout</Button>
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
       


       <TableContainer w="100%">
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>




        
          </Container>
        </Box>
      </Box>
    </>
  );
}
