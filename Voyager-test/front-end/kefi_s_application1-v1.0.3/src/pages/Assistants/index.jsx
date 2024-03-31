import React from "react";
import { Helmet } from "react-helmet";
import Assistants from "../../components/AssistantsComp";
import { Button, Image, Text, Heading, Flex, Container, Box } from "@chakra-ui/react";
import AssistantsComp from "../../components/AssistantsComp";

export default function AssistantsPage() {
  return (
    <>
      <Helmet>
        <title>Assistants</title>
        <meta name="description" content="" />
      </Helmet>
      <Box pb={{ md: "107px", base: "20px" }} bg="white.A700_01" w="100%">
        <Flex flexDirection="column" alignItems="start">
          <AssistantsComp zIndex={1} alignSelf="stretch" />
          <Flex
            mt="-1px"
            position="relative"
            bg="indigo.A700_01"
            alignSelf="stretch"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            p={{ base: "20px", sm: "23px" }}
          >
            <Flex ml={{ md: "20px", base: "0px" }} w="18%" justifyContent="center" alignItems="center">
              <Image src="images/img_maximize.svg" h="30px" w="30px" />
              <Image src="images/img_settings.svg" h="12px" ml="11px" />
              <Box h="23px" ml="20px" bg="blue_gray.100" w="1px" />
              <Text
                color="gray.50"
                ml="4px"
                letterSpacing="-0.18px"
                fontFamily="FK Grotesk Neue Trial"
                fontWeight={300}
              >
                Entrepreneurs
              </Text>
            </Flex>
            <Flex gap="21px" w="6%" justifyContent="center" alignItems="center">
              <Image src="images/img_bell.svg" h="24px" w="24px" />
              <Image src="images/img_avatar.png" borderRadius="50%" h="43px" w="43px" />
            </Flex>
          </Flex>
          <Container
            mt="57px"
            gap="17px"
            display="flex"
            w="100%"
            alignItems="start"
            maxW="909px"
            px="0px"
            mx="auto"
            flexDirection={{ md: "row", base: "column" }}
            p={{ md: "", base: "20px" }}
          >
            <Image src="images/img_info.svg" h="24px" mt="10px" w={{ md: "24px", base: "100%" }} />
            <Text
              color="gray.900_01"
              fontFamily="FK Grotesk Neue Trial"
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
            ml={{ md: "69px", base: "0px" }}
            letterSpacing="-0.29px"
            fontFamily="FK Grotesk Neue Trial"
            fontSize="26px"
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
                  <Heading size="xs" color="gray.700" fontFamily="FK Grotesk Neue Trial">
                    Business Plan
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    fontFamily="FK Grotesk Neue Trial"
                    lineHeight="120%"
                  >
                    Get expert guidance with our AI Business Plan Assistant
                  </Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="lime_300"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontFamily="Inter"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                >
                  Get Assistant
                </Button>
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
                  <Heading size="xs" as="h3" color="gray.700" fontFamily="FK Grotesk Neue Trial">
                    Journey Log
                  </Heading>
                  <Text
                    size="s"
                    color="gray.900_01"
                    letterSpacing="-0.07px"
                    fontFamily="FK Grotesk Neue Trial"
                    lineHeight="120%"
                  >
                    Navigate your business jpurney with our AI-powered Log, connecting you with expert advice
                  </Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="lime_300"
                  rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
                  mb="13px"
                  fontFamily="Inter"
                  fontWeight={600}
                  gap="8px"
                  minW="161px"
                  borderRadius="8px"
                >
                  Get Assistant
                </Button>
              </Flex>
            </Flex>
            <Heading
              size="md"
              as="h4"
              color="gray.600"
              ml={{ md: "13px", base: "0px" }}
              letterSpacing="-0.29px"
              fontFamily="FK Grotesk Neue Trial"
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
            <Flex mt="21px" gap="5px" flexDirection="column" alignItems="start">
              <Heading size="xs" color="gray.700" fontFamily="FK Grotesk Neue Trial">
                Sha guidance
              </Heading>
              <Text size="s" color="gray.900_01" letterSpacing="-0.07px" fontFamily="FK Grotesk Neue Trial">
                Get expert guidance with our..
              </Text>
            </Flex>
            <Button
              size="sm"
              colorScheme="lime_300"
              rightIcon={<Image src="images/img_arrowright_indigo_900.svg" />}
              mb="21px"
              fontFamily="Inter"
              fontWeight={600}
              gap="8px"
              minW="161px"
              borderRadius="8px"
            >
              Get Assistant
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
