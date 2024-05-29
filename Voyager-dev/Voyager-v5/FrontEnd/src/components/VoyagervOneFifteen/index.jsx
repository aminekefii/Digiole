import React from "react";
import { Image, Flex, Box, Text, Heading, Container } from "@chakra-ui/react";

export default function VoyagervOneFifteen({
  intelligent = "Intelligent Conversations Tailored to Startup Founders",
  description = "Our AI chat feature acts as your personal advisor, leveraging dedicated knowledge in startup ecosystems to provide tailored advice on funding, support services, and strategic planning. Designed with startup founders in mind, it delivers personalized interactions based on your startup's stage and needs.",
  ...props
}) {
  return (
    <Box {...props}>
      <Container
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="1336px"
        px="0px"
        mx="auto"
        flexDirection={{ base: "column", md: "row" }}
        p={{ base: "20px" }}
      >
        <Flex gap="12px" w={{ base: "100%", md: "44%" }} flexDirection="column">
          <Heading size="md" as="h1" fontSize={{ base: "32px", md: "47px" }}>
            {intelligent}
          </Heading>
          <Text size="xl" color="gray.700_01" w="100%">
            {description}
          </Text>
        </Flex>
        <Box h={{ base: "auto", md: "696px" }} w="100%" position="relative" mt={{ base: "20px", md: "0" }}>
          <Image
            src="images/img_rectangle_3476.png"
            h={{ base: "auto", md: "696px" }}
            w="100%"
            position="absolute"
            left="0"
            bottom="0"
            right="0"
            top="0"
            m="auto"
            objectFit="cover"
          />
          <Flex
            w="100%"
            justifyContent="center"
            position="relative"
            bottom="0"
            right="0"
            left="0"
            m="auto"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            pb={{ base: "10px", md: "" }}
          >
           
            <Image
              src="images/intelligent.png"
              mt={{ base: "150px", md: "160px"  }}
              ml={{ base: "0", md: "200px" }}
              w={{ base: "70%", md: "58%" }}
              h="auto"
              pb={{ base: "10px", md: "" }}
            />
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
