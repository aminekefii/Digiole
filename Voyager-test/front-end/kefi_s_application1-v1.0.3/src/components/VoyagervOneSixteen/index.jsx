import React from "react";
import { Button, Image, Flex, Heading, Box, Text, AbsoluteCenter, Container, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";



export default function VoyagervOneSixteen({
  pagetitle = "Page Title",
  link,
  features = "What is CirclePass?",
  featuresOne = "FAQ",
  featuresTwo = "Contact",
  signInWith = "Sign In",
  voyagerapp = "Voyager App: Your AI-powered guide through the startup ecosystem",
  p7xl = "Navigate Your Startup Journey with Precision and Ease",
  getEarlyAcces = "Get Early Acces",
  exploreUse = "Explore Use Cases",
  ...props
}) {
  return (
    <Box {...props}>

      <AbsoluteCenter w="100%" h="100%" m="auto" minW={{ base: "320px" }}>
        <Image
          src="images/16.png"
          w="100%" h="100%"
          position="absolute"

          bottom="0px"
          right="0px"
          top="0px"
          justifyContent="center"
        />
        <Box alignSelf="end">

          <Box h="820px" position="relative">

            <Flex w="94%" justifyContent="flex-end" position="absolute" right="0px" top="3%" m="auto">
              <Flex gap="25px" w="100%" flexDirection="column">
              <Container maxW="1268px" w="100%" px="0px" mx="auto" p={{ md: "", base: "20px" }}>
  <Flex justifyContent="space-between" alignItems="center" gap="20px" flexDirection={{ md: "row", base: "column" }}>
    <Flex gap="12px" w={{ md: "10%", base: "100%" }} justifyContent="left" alignItems="center">
      <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
      <Image src="images/img_voyager.svg" h="12px" />
    </Flex>
   
    <Flex alignItems="center" justifyContent="space-between" gap="50px">
      <Text
        color="gray.50"
        letterSpacing="-0.08px"
        textAlign="center"
        fontWeight={500}
        fontSize={{ base: "sm", sm: "md" }}
        _hover={{ textDecoration: "underline", color: "white" }}
      >
        FAQ
      </Text>
      <Text
        color="gray.50"
        letterSpacing="-0.08px"
        textAlign="center"
        fontWeight={500}
        fontSize={{ base: "sm", sm: "md" }}
        _hover={{ textDecoration: "underline", color: "white" }}
        ml="20px"
      >
        Contact
      </Text>
      <Button
        as={Link}
        to="/assistants"
        size="sm"
        variant="outline"
        colorScheme="lime_100"
        color="white.A700_01"
        letterSpacing="-0.08px"
        fontWeight={500}
        minW={{ base: "50px", md: "70px" }}
        borderRadius="20px"
        _hover={{ bg: "#EAF2BB" , color: "black" }}
        fontSize={{ base: "xs", md: "sm" }}
        ml="20px"
      >
        {signInWith}
      </Button>
    </Flex>
  </Flex>
</Container>

                <Box h="623px" position="relative" maxW="1340px" w="100%" mx="auto" p={{ md: "", base: "20px" }}>
                  <AbsoluteCenter
                    w="100%"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="start"
                    h="100%"
                    m="auto"
                    flexDirection={{ md: "row", base: "column" }}
                  >
                    <Text size="2xl" color="white.A700" mt="257px" textAlign="left" zIndex={1}>
                      {voyagerapp}
                    </Text>

                  </AbsoluteCenter>
                  <Heading
                    size="xl"
                    as="h1"
                    color="white.A700"
                    fontSize="68px"
                    w="75%"
                    position="absolute"
                    left="0px"
                    top="14%"
                    m="auto"
                  >
                    {p7xl}
                  </Heading>
                  <Flex gap="18px" w="30%" position="absolute" bottom="41%" left="0px" m="auto">
                    <Button
                      colorScheme="lime_200"
                      rightIcon={<Image src="images/img_arrowright_blue_gray_900.svg" />}
                      letterSpacing="-0.08px"
                      fontWeight={500}
                      gap="8px"
                      borderColor="blue_gray.900"
                      borderWidth="1px"
                      borderStyle="solid"
                      w="100%"
                      borderRadius="24px"
                      px={{ base: "20px", sm: "" }}
                    >
                      {getEarlyAcces}
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="lime_300"
                      letterSpacing="-0.08px"
                      fontWeight={500}
                      w="100%"
                      borderRadius="24px"
                      px={{ base: "20px", sm: "" }}
                      color="white.A700"
                    >
                      {exploreUse}
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box >
      </AbsoluteCenter >
    </Box >
  );
}