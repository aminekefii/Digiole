import React from "react";
import { Helmet } from "react-helmet";
import VoyagervOneEleven from "../../components/VoyagervOneEleven";
import VoyagervOneFifteen from "../../components/VoyagervOneFifteen";
import VoyagervOneFive from "../../components/VoyagervOneFive";
import VoyagervOneFourteen from "../../components/VoyagervOneFourteen";
import VoyagervOneSixteen from "../../components/VoyagervOneSixteen";
import VoyagervOneThirteen from "../../components/VoyagervOneThirteen";
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

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>landing page</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <Box w="100%">
        <Box>
          <Box>
            <Box>
              <VoyagervOneSixteen
                h="820px"
                bgGradient="linear-gradient(180deg, #3745de,#3745dee2)"
                position="relative"
              />
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
          <VoyagervOneFive h="477px" mt="-1px" zIndex={2} bg="indigo.800_02" position="relative" />
          <VoyagervOneThirteen
            mt="-1px"
            pl="58px"
            pr="56px"
            gap={{ md: "71px", base: "35px", sm: "53px" }}
            zIndex={3}
            display="flex"
            bg="white.A700"
            flexDirection="column"
            py="58px"
            p={{ md: "", base: "20px" }}
          />
          <VoyagervOneEleven h="1273px" mt="-2px" bg="white.A700" position="relative" />
          <Box
            direction="column"
            as="footer"
            pl="60px"
            pr="56px"
            bg="indigo.A700_01"
            py="60px"
            p={{ md: "", base: "20px" }}
          >
            <Container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              maxW="1232px"
              w="100%"
              gap="20px"
              px="0px"
              mx="auto"
              flexDirection={{ md: "row", base: "column" }}
            >
              <Flex
                mt="8px"
                w={{ md: "55%", base: "100%" }}
                justifyContent="space-between"
                alignItems="start"
                gap="20px"
                flexDirection={{ base: "column", sm: "row" }}
                p={{ md: "", base: "20px" }}
              >
                <Box w={{ base: "100%", sm: "22%" }}>
                  <Flex gap="15px" flexDirection="column">
                    <Flex pt="1px">
                      <Heading as="h5" color="gray.100_01" fontSize="23px">
                        Learn More
                      </Heading>
                    </Flex>
                    <UnorderedList
                      styleType="none"
                      gap="8px"
                      alignSelf="start"
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">FAQs</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Blog</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">EcosystemOS</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Pricing</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">EOS Data Repository</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Our Company</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Startup Commons</Text>
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Box>
                <Box w={{ base: "100%", sm: "23%" }}>
                  <Flex gap="15px" flexDirection="column">
                    <Flex pt="2px">
                      <Heading as="h5" color="gray.100_01" fontSize="23px" alignSelf="end">
                        Core Apps
                      </Heading>
                    </Flex>
                    <UnorderedList
                      styleType="none"
                      gap="7px"
                      alignSelf="start"
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="center"
                    >
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px" mt="2px">
                            Ecosystem Advisor AI
                          </Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Blog</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Skyview App</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Orchestra App</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Wisdom App</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Station App</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Voyager App</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">CirclePass</Text>
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Box>
                <Flex pt="2px" w={{ base: "100%", sm: "37%" }} justifyContent="center">
                  <Flex gap="15px" w="100%" flexDirection="column">
                    <Flex pt="2px">
                      <Heading as="h5" color="gray.100_01" fontSize="23px" alignSelf="end">
                        Interoperability
                      </Heading>
                    </Flex>
                    <UnorderedList
                      styleType="none"
                      pt="2px"
                      gap="8px"
                      alignSelf="start"
                      display="flex"
                      flexDirection="column"
                      alignItems="start"
                    >
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Ecosystem Development Academy</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Blog</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Startup Development Phases</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Common KPIs</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">Open Standard Data Model</Text>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link href="#">
                          <Text letterSpacing="-0.05px">World digital Ecosystems Forum</Text>
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                gap={{ base: "28px", sm: "56px" }}
                w={{ md: "31%", base: "100%" }}
                flexDirection="column"
                alignItems="end"
                p={{ md: "", base: "20px" }}
              >
                <Flex gap="7px" alignSelf="stretch" flexDirection="column">
                  <Flex gap="7px" flexDirection="column" alignItems="start">
                    <Text size="4xl" fontSize="23px">
                      Subscribe to Newsletter
                    </Text>
                    <Text letterSpacing="-0.08px" fontWeight={300}>
                      <Text as="span" color="#ff0505">
                        *
                      </Text>
                      <Text as="span" color="gray.100_01" fontSize="14px" fontWeight={200} fontStyle="italic">
                        Indicates require fiel
                      </Text>
                      <Text
                        as="span"
                        color="gray.100_01"
                        letterSpacing="0.70px"
                        fontSize="14px"
                        fontWeight={200}
                        fontStyle="italic"
                      >
                        d
                      </Text>
                    </Text>
                  </Flex>
                  <Box pb="7px">
                    <Flex gap="7px" flexDirection="column">
                      <Text letterSpacing="-0.08px" fontWeight={500}>
                        Email
                      </Text>
                      <Input />
                      <Flex gap="19px" flexDirection="column" alignItems="start">
                        <Flex gap="6px" w={{ md: "91%", base: "100%" }} alignItems="center">
                          <Box
                            h="17px"
                            alignSelf="start"
                            borderColor="white.A700"
                            borderWidth="1px"
                            borderStyle="solid"
                            w="17px"
                            borderRadius="4px"
                          />
                          <Text size="s" letterSpacing="-0.07px" alignSelf="end">
                            <Text size="s" as="span" color="gray.100_01">
                              I aggre to receiving marketing and promotional materials
                            </Text>
                            <Text size="s" as="span" color="#ff0000">
                              *
                            </Text>
                          </Text>
                        </Flex>
                        <Button
                          size="md"
                          colorScheme="lime_300"
                          fontWeight={500}
                          w="100%"
                          borderRadius="6px"
                          px={{ base: "20px", sm: "" }}
                        >
                          Subscribe
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                <Flex w={{ md: "78%", base: "100%" }} flexDirection="column" alignItems="end">
                  <Box alignSelf="stretch">
                    <Image src="images/img_ecosystemos_logo.svg" h="49px" />
                  </Box>
                  <Link href="#">
                    <Text size="lg" textAlign="right">
                      by Digiole
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}
