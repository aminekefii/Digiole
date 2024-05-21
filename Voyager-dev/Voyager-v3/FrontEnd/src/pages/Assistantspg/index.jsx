import React from 'react';
import { Helmet } from "react-helmet";
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";
import "../../styles/index.css";
import "../../styles/font.css";
import { Link } from "react-router-dom";
import { doSignOut } from '../../components/firebase/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import '../../styles/Modal.css';
import ProfilePictue from 'components/ProfilePicUpdate';
import GetAssisant from 'components/GetAssistant';


export default function AssistantsPage() {


  const handleLogout = () => {
    doSignOut().then(() => {
      window.location.href = '/login';
    });
  };

  return (
    <>
      <Helmet>
        <title>Assistants</title>
        <meta name="description" content="Web site created using create-react-app" />

      </Helmet>
      <Box pb={{ md: "107px", base: "20px" }} bg="white.A700_01" w="100%">
        <Flex flexDirection="column" alignItems="start">
          <Flex
            mt="-1px"
            position="relative"
            bg="indigo.A700_01"
            alignSelf="stretch"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            p={{ base: "20px", sm: "23px" }}
            flexDirection={{ md: 'row', base: 'row' }}
          >
            <Flex ml={{ md: "20px", base: "0px" }} w="100%" alignItems="center" >
              <Flex gap="12px" w={{ md: '80%', base: '100%' }} justifyContent="left" alignItems="center">
                <Link to="/landingpage">
                  <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
                </Link>
                <Link to="/landingpage">   <Image src="images/img_voyager.svg" h="12px" ml="10px" /></Link>
                <Text
                  color="gray.50"
                  ml="12px"
                  letterSpacing="-0.18px"
                  fontWeight={300}
                >
                  | Entrepreneurs
                </Text>
              </Flex>
            </Flex>

            <Flex gap="21px" w={{ md: "6%", base: "6%" }} justifyContent="center" alignItems="center">
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
            mt="57px"
            gap="17px"
            display="flex"
            w={{ md: "100%", base: "100%" }}
            alignItems="start"
            justifyContent="flex-start"
            maxW="90%"
            px="0px"
            flexDirection={{ md: "row", base: "row" }}
            p={{ md: "", base: "10px" }}
            pr={{ md: "270px", base: "100px" }}
          >
            <Image src="images/img_info.svg" h="24px" mt="10px" w={{ md: "24px", base: "10%" }} />
            <Text
              color="gray.900_01"

              fontWeight={300}
              w={{ md: "97%", base: "100%" }}
              lineHeight="23px"
            >
              As an entrepreneur, you can streamline your startup&#39;s management and access support services
              efficiently, with automated resource matching, progress tracking, and actionable insights for informed
              decision-making.
            </Text>
          </Container>
          <Heading
            size="md"
            as="h1"
            color="gray.600"
            mt="58px"
            fontWeight={800}
            ml={{ md: "100px", base: "40px" }}
            letterSpacing="-0.29px"
            fontSize="26px"
            lineHeight="39px"
          >
            Assistants
          </Heading>
          <Flex
            mt="17px"
            ml={{ md: "63px", base: "0px" }}
            gap={{ md: "71px", base: "35px", sm: "53px" }}
            w={{ md: "49%", base: "100%" }}
            flexDirection="column"
            alignItems="start"
            p={{ md: "", base: "20px" }}
          >
            <Flex gap="28px" alignSelf="stretch" flexDirection={{ md: "row", base: "column" }}>
              <Flex
                gap="44px"
                bg="gray.50_02"
                w="100%"
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
                p="20px"
                borderRadius="8px"
              >
                <Flex mt="11px" gap="7px" alignSelf="stretch" flexDirection="column" alignItems="start">
                  <Heading size="xs" color="gray.700" >
                    Business Plan
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    lineHeight="120%"
                  >
                    Get expert guidance with our AI Business Plan Assistant
                  </Text>
                </Flex>
                <GetAssisant></GetAssisant>
              </Flex>
              <Flex
                gap="28px"
                bg="gray.50_02"
                w="100%"
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
                p="20px"
                borderRadius="8px"
              >
                <Flex mt="13px" gap="5px" alignSelf="stretch" flexDirection="column" alignItems="start">
                  <Heading size="xs" as="h3" color="gray.700" >
                    Journey Log
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    lineHeight="120%"
                  >
                    Navigate your business journey with our AI-powered Log, connecting you with expert advice
                  </Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="lime_200"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                  zIndex={1}
                >
                  Get Assistant
                </Button>
              </Flex>
            </Flex>
            <Heading
              size="md"
              as="h4"
              color="gray.600"
              ml={{ md: "20px", base: "20px" }}
              letterSpacing="-0.29px"
              fontSize="26px"
            >
              <Heading size="md" as="span" color="gray.600">
                Assistants
              </Heading>
              <Heading size="md" as="span" color="gray.600">
                &nbsp;
              </Heading>
              <Heading size="md" as="span" color="gray.600" fontWeight={300}>
                Coming Soon
              </Heading>
            </Heading>
          </Flex>
          <Flex
            mt="33px"
            ml={{ md: "66px", base: "0px" }}
            gap="43px"
            bg="gray.50_02"
            w={{ md: "23%", base: "100%" }}
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            p="20px"
            borderRadius="8px"
          >
            <Flex mt="21px" gap="5px" flexDirection="column" alignItems="start" ml="20px">
              <Heading size="xs" color="gray.700" >
                Sha guidance
              </Heading>
              <Text size="s" color="gray.900_01" letterSpacing="-0.07px" >
                Get expert guidance with our..
              </Text>
            </Flex>
            <Button
              size="sm"
              colorScheme="lime_200"
              rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
              mb="21px"
              fontWeight={600}
              gap="8px"
              minW="161px"
              borderRadius="8px"
              ml="17px"
            >
              Get Assistant
            </Button>
          </Flex>
        </Flex>
      </Box>
      <ToastContainer />
    </>
  );
}
