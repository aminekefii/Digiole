import React from "react";
import { Text, Image, Flex, Container, Heading, Box } from "@chakra-ui/react";

export default function VoyagervOneFourteen({
  expertiseat = "Expertise at Your Fingertips",
  voyagerapps = "Voyager App's AI is equipped with specialized knowledge",
  funding = (
    <>
      Funding Opportunities <br />& Application Strategies
    </>
  ),
  strategicTwo = (
    <>
      Strategic Planning &<br />
      Development milestones
    </>
  ),
  ecosystem = (
    <>
      Ecosystem Support
      <br /> Services Matching
    </>
  ),
  description = (
    <>
      Real-Time Ecosystem
      <br />
      Analytics for Informed
      <br />
      Decision Making
    </>
  ),
  ...props
}) {
  return (
    <Box {...props}>
      <Heading size="s" as="h1" ml={{ md: "50px", base: "0px" }} fontSize="33px">
        {expertiseat}
      </Heading>
      <Text size="xl" color="gray.700_01" ml={{ md: "50px", base: "0px" }}>
        {voyagerapps}
      </Text>
      <Container mb="49px" w="95%" display="flex" maxW="1452px" px="0px" mx="auto" p={{ md: "20px", base: "20px" }}>
        <Flex gap="100px" w="91%" flexDirection={{ md: "row", base: "column" }}>
          <Flex gap="49px" w={{ md: "21%", base: "100%" }} flexDirection="column" alignItems="center">
            <Image src="images/img_funding.svg" h={{ md: "248.48px", base: "auto" }} mt="25.48px" alignSelf="stretch" />
            <Text
              size="2xl"
              color="blue_gray.900_05"
              letterSpacing="0.40px"
              textAlign="center"
              w={{ md: "80%", base: "100%" }}
            >
              {funding}
            </Text>
          </Flex>
          <Flex gap="48px" w={{ md: "22%", base: "100%" }} flexDirection="column" alignItems="center">
            <Image src="images/img_strategic_planning.svg" h={{ md: "229.55px", base: "auto" }} mt="44.65px" alignSelf="stretch" />
            <Text
              size="2xl"
              color="blue_gray.900_06"
              letterSpacing="0.40px"
              textAlign="center"
              w={{ md: "80%", base: "100%" }}
            >
              {strategicTwo}
            </Text>
          </Flex>
          <Flex gap="48px" w={{ md: "23%", base: "100%" }} flexDirection="column" alignItems="center">
            <Image src="images/img_eco_support.svg" h={{ md: "263.04px", base: "auto" }} mt="10.96px" alignSelf="stretch" />
            <Text
              size="2xl"
              color="blue_gray.900_04"
              textAlign="center"
              w={{ md: "76%", base: "100%" }}
              lineHeight="120%"
            >
              {ecosystem}
            </Text>
          </Flex>
          <Flex gap="48px" w={{ md: "22%", base: "100%" }} flexDirection="column" alignItems="end">
            <Image src="images/img_time.png" alignSelf="stretch" h="250px" mt="26px" />
            <Text
              size="2xl"
              color="blue_gray.900_06"
              letterSpacing="0.40px"
              textAlign="center"
              w={{ md: "81%", base: "100%" }}
            >
              {description}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
