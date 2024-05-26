import { useEffect } from "react";
import React from "react";
import { Helmet } from "react-helmet";
import VoyagervOneEleven from "../../components/VoyagervOneEleven";
import VoyagervOneFifteen from "../../components/VoyagervOneFifteen";
import VoyagervOneFive from "../../components/VoyagervOneFive";
import VoyagervOneFourteen from "../../components/VoyagervOneFourteen";
import VoyagervOneSixteen from "../../components/VoyagervOneSixteen";
import VoyagervOneThirteen from "../../components/VoyagervOneThirteen";
import Footer from "../../components/Footer";
import { useAuth } from '../../components/contexts/authContext'

import {
  Link,
  Text,
  Image,
  Box,
  Flex,
  Button,
  Input,
  UnorderedList,
  ListItem,
  Heading,
  Container,
} from "@chakra-ui/react";


// Remove the global error event listener
window.onerror = null;

export default function LandingPage() {

  const { currentUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>landing page</title>
        <meta name="description" content="" />
      </Helmet>
      <Box w="100%" minW={{ base: "400px" }}>
        <Box>
          <Box>
            <Box>
              <VoyagervOneSixteen h="780px" position="relative" />
            </Box>
            <VoyagervOneFifteen mt="-1px" zIndex={1} bg="white.A700" />
          </Box>
          <VoyagervOneFourteen
            mt="-1px"
            pl={{ md: "69px", base: "20px" }}
            gap="20px"
            zIndex={1}
            overflow="auto"
            display="flex"
            bg="white.A700"
            flexDirection="column"
            py={{ md: "69px", base: "20px" }}
            
          />
          <VoyagervOneFive
            h="477px"
            mt="-1px"
            bg="indigo.800_05"
            position="relative"
            textAlign="center"
          />
          <VoyagervOneThirteen
            mt="-1px"
            pl="50px"
            pr="56px"
            gap={{ md: "71px", base: "35px", sm: "53px" }}
            zIndex={3}
            display="flex"
            bg="white.A700"
            flexDirection="column"
            py="58px"
            p={{ md: "", base: "20px" }}
          />
          <VoyagervOneEleven
            h="1273px"
            mt="-2px"
            bg="white.A700"
            position="relative"
          />
          <Footer
            mt="-1px"
            zIndex={3}
            position="relative"
            bg="indigo.A700_01"
            p={{ md: "60px", base: "20px" }}
          />
        </Box>
      </Box>
    </>
  );
}
