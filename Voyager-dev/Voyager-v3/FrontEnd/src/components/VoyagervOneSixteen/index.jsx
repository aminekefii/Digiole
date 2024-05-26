import React from "react";
import { Button, Image, Flex, Heading, Box, Text, AbsoluteCenter, Container } from "@chakra-ui/react";
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
          w="100%"
          h="100%"
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
                <Container maxW="1268px" w="100%" px="0px" mx="auto" p={{ base: "20px" }}>
                  <Flex justifyContent="space-between" alignItems="center" gap="20px" flexDirection={{ base: "row", md: "row" }}>
                    <Flex gap="12px" w={{ base: "80%", md: "10%" }} justifyContent="left" alignItems="center">
                      <Image src="images/img_voyager_icon.svg" h="32px" w="32px" />
                      <Image src="images/img_voyager.svg" h="12px" />
                    </Flex>

                    <Flex alignItems="center" justifyContent="space-between" gap={{ base: "10px", md: "50px" }}>
                      <Text
                        color="gray.50"
                        letterSpacing="-0.08px"
                        textAlign="center"
                        fontWeight={500}
                        fontSize={{ base: "sm", md: "md" }}
                        _hover={{ textDecoration: "underline", color: "white" }}
                      >
                        FAQ
                      </Text>
                      <Text
                        color="gray.50"
                        letterSpacing="-0.08px"
                        textAlign="center"
                        fontWeight={500}
                        fontSize={{ base: "sm", md: "md" }}
                        _hover={{ textDecoration: "underline", color: "white" }}
                        ml="20px"
                      >
                        Contact
                      </Text>
                      <Button
                        as={Link}
                        to="/login"
                        size="sm"
                        variant="outline"
                        colorScheme="lime_100"
                        color="white.A700_01"
                        letterSpacing="-0.08px"
                        fontWeight={500}
                        minW={{ base: "70px", md: "90px" }}
                        borderRadius="20px"
                        _hover={{ bg: "#EAF2BB", color: "black" }}
                        fontSize={{ base: "xs", md: "sm" }}
                        ml="20px"
                      >
                        {signInWith}
                      </Button>
                    </Flex>
                  </Flex>
                </Container>

                <Box h="623px" position="relative" maxW="1340px" w="100%" mx="auto" p={{ base: "20px" }}>
                  <AbsoluteCenter
                    w="100%"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="start"
                    h="100%"
                    m="auto"
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <Text size="2xl" color="white.A700" mt={{ base: "200px", md: "257px" }} textAlign="left" zIndex={1}>
                      {voyagerapp}
                    </Text>
                  </AbsoluteCenter>
                  <Heading
                    size="xl"
                    as="h1"
                    color="white.A700"
                    fontSize={{ base: "32px", md: "40px", lg: "68px" }}
                    w={{ base: "90%", md: "75%", lg: "100%" }}
                    position="absolute"
                    left="0px"
                    top={{ base: "10%", md: "14%" }}
                    m="0px"
                    fontWeight="800"
                  >
                    {p7xl}
                  </Heading>
                  <Flex   pr={{ base: "30px", md: "10px" }} gap="18px" w={{ base: "100%", md: "47%" }} position="absolute" bottom="41%" left="0px" m="auto" flexDirection={{ base: "column", md: "row" }} > 
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
                      px={{ base: "20px", sm: "16px", md: "20px" }}
                      fontSize={{ base: "sm", md: "md", }}
                      mr={{ base: "10px", md: "" }}

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
                      px={{ base: "20px", sm: "16px", md: "20px" }}
                      color="white.A700"
                      fontSize={{ base: "sm", md: "md" }}
                      mr={{ base: "10px", md: "" }}

                    >
                      {exploreUse}
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}
