import React from "react";
import { Image, Flex, Box, Text, Heading, Container } from "@chakra-ui/react";

export default function VoyagervOneFifteen({
  intelligent = "Intelligent Conversations Tailored to Startup Founders",
  description = "Our AI chat feature acts as your personal advisor, leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning. Designed with startup founders in mind, it delivers personalized interactions based on your startup&#39;s stage and needs.",
  ...props
}) {
  return (
    <Box {...props}>
      <Container
        w="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        maxW="1336px"
        px="0px"
        mx="auto"
        flexDirection={{ md: "row", base: "column" }}
        p={{ md: "", base: "20px" }}
      >
        <Flex gap="12px" w={{ md: "44%", base: "100%" }} flexDirection="column">
          <Heading size="md" as="h1" fontSize="47px">
            {intelligent}
          </Heading>
          <Text size="xl" color="gray.700_01" w={{ md: "84%", base: "100%" }}>
            {description}
          </Text>
        </Flex>
        <Box h="696px" flex={{ md: 1, base: "unset" }} position="relative" w={{ md: "auto", base: "100%" }}>
          <Image
            src="images/img_rectangle_3476.png"
            h="696px"
            w="96%"
            position="absolute"
            left="0px"
            bottom="0px"
            right="0px"
            top="0px"
            justifyContent="center"
            m="auto"
          />
          <Flex
            w="100%"
            justifyContent="center"
            position="absolute"
            bottom="0px"
            right="0px"
            left="0px"
            m="auto"
            flexDirection={{ md: "row", base: "column" }}
          >
            <Image src="images/img_mockup_8copia_1.png" w={{ md: "42%", base: "100%" }} h="auto" />
            <Image
              src="images/img_mockup_copia_3.png"
              ml={{ md: "-249px", base: "0px" }}
              w={{ md: "58%", base: "100%" }}
              h="auto"
            />
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
