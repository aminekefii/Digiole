import React from "react";
import { Text, Heading, Image, Flex, Container, Box } from "@chakra-ui/react";

export default function VoyagervOneThirteen({
  transforming = "Transforming Startup Success Stories",
  earlystage = "Early-Stage Founder",
  description = "Discover how an early-stage startup used Voyager to identify and secure their first round of seed funding, by matching with the right investors and crafting a winning pitch with AI guidance.",
  seeking = "Seeking Partnerships",
  description1 = "See how Voyager helped a startup in need of strategic partnerships to navigate and connect with potential allies, enhancing their market position and service offerings",
  scalingstartup = "Scaling Startup",
  description2 = "Learn how a growth-phase tech startup leveraged Voyager for strategic expansion advice, finding new ecosystem support services to scale operations internationally.",
  ...props
}) {
  return (
    <Box {...props}>
      <Flex ml={{ md: "26px", base: "0px" }} pt="3px" w="47%" justifyContent="center" px="3px">
        <Heading size="s" as="h1" fontSize="33px" alignSelf="end">
          {transforming}
        </Heading>
      </Flex>
      <Container
        mb="25px"
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        maxW="902px"
        gap="20px"
        px="0px"
        mx="auto"
        flexDirection={{ md: "row", base: "column" }}
        p={{ md: "", base: "20px" }}
      >
        <Flex
          w={{ md: "63%", base: "100%" }}
          justifyContent="space-between"
          alignItems="start"
          gap="20px"
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Flex gap="24px" w={{ base: "100%", sm: "47%" }} flexDirection="column" alignItems="center">
            <Image src="images/img_creative_idea.svg" h="64px" w="64px" />
            <Heading textAlign="center" fontSize="23px">
              {earlystage}
            </Heading>
            <Text color="gray.700" letterSpacing="-0.05px">
              {description}
            </Text>
          </Flex>
          <Flex gap="22px" w={{ base: "100%", sm: "46%" }} flexDirection="column" alignItems="center">
            <Image src="images/img_affiliate.svg" h="64px" w="64px" />
            <Heading as="h3" textAlign="center" fontSize="23px">
              {seeking}
            </Heading>
            <Text color="gray.700" letterSpacing="-0.05px">
              {description1}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="24px" w={{ md: "30%", base: "100%" }} flexDirection="column" alignItems="center">
          <Image src="images/img_valuations.svg" h="64px" w="64px" />
          <Heading textAlign="center" fontSize="23px">
            {scalingstartup}
          </Heading>
          <Text color="gray.700" letterSpacing="-0.05px">
            {description2}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
