import React from "react";
import {
  Link,
  Text,
  Image,
  Flex,
  Button,
  Checkbox,
  Input,
  Box,
  UnorderedList,
  ListItem,
  Heading,
  Container,
} from "@chakra-ui/react";

export default function Footer({ ...props }) {
  return (
    <Box {...props} as="footer">
      <Container w="100%" maxW="1232px" px="0px" mx="auto">
        <Flex flexDirection="column" alignItems="center" justifyContent="center">
          <Flex
            alignSelf="stretch"
            justifyContent="space-between"
            alignItems="start"
            gap="20px"
            flexDirection={{ md: "row", base: "column" }}
          >
            <Flex
              mt="8px"
              w={{ md: "55%", base: "100%" }}
              justifyContent="space-between"
              alignItems="start"
              gap="20px"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Flex flexDirection="column">
                <Flex gap="14px" alignSelf="start" flexDirection="column" alignItems="start">
                  <Link href="#">
                    <Heading as="h5" color="gray.100_01" fontSize="23px">
                      Learn More
                    </Heading>
                  </Link>
                  <UnorderedList styleType="none" gap="8px" display="flex" flexDirection="column" alignItems="start">
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
              </Flex>
              <Flex flexDirection="column">
                <Flex gap="12px" alignSelf="start" flexDirection="column" alignItems="start">
                  <Link href="#">
                    <Heading as="h5" color="gray.100_01" fontSize="23px">
                      Core Apps
                    </Heading>
                  </Link>
                  <UnorderedList
                    styleType="none"
                    gap="7px"
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
              </Flex>
              <Flex>
                <Flex gap="12px" flexDirection="column" alignItems="start" justifyContent="center">
                  <Link href="Interoperability" target="_blank" rel="noreferrer">
                    <Heading as="h5" color="gray.100_01" fontSize="23px">
                      Interoperability
                    </Heading>
                  </Link>
                  <UnorderedList styleType="none" gap="8px" display="flex" flexDirection="column" alignItems="start">
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
            <Flex gap="7px" w={{ md: "31%", base: "100%" }} flexDirection="column">
              <Flex gap="7px" flexDirection="column" alignItems="start">
                <Text size="4xl" fontSize="23px" fontWeight={500}>
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
                <Flex gap="7px" flexDirection="column" alignItems="start">
                  <Text letterSpacing="-0.08px" fontWeight={500}>
                    Email
                  </Text>
                  <Input size="xs" variant="outline" colorScheme="indigo_50_03" alignSelf="stretch" />
                  <Flex gap="19px" alignSelf="stretch" flexDirection="column" alignItems="start">
                    <Checkbox
                      value="false"
                      color="gray.100_01"
                      letterSpacing="-0.07px"
                      fontSize="13px"
                      gap="6px"
                      p="1px"
                    >
                      I aggre to receiving marketing and promotional materials*
                    </Checkbox>
                    <Button
                      size="md"
                      colorScheme="lime_300_03"
                      color="blue_gray.900_01"
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
          </Flex>
          <Flex mt="26px" w={{ md: "25%", base: "100%" }} justifyContent="flex-end">
            <Image src="images/img_ecosystemos_logo.svg" h="49px" />
          </Flex>
          <Link href="#">
            <Text size="lg" textAlign="right">
              by Digiole
            </Text>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
