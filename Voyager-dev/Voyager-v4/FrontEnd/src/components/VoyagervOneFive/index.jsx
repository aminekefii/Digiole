import React from "react";
import { Text, Heading, AbsoluteCenter, Image, Box } from "@chakra-ui/react";

export default function VoyagervOneFive({
  growingwith = "Growing with Your Ambitions",
  description = "We're just getting started. Future versions of Voyager will introduce an expanded suite of AI knowledge assistants, focusing on areas like pitch deck optimization, business plan development, and performance benchmarking, all designed to evolve with your startup's journey",
  ...props
}) {
  return (
    <Box {...props}>
      <Image
        src="images/img_rectangle_477x1440.png"
        h={{ md: "477px", base: "auto" }}
        w="100%"
        position="absolute"
        left="0px"
        bottom="0px"
        right="0px"
        top="0px"
        justifyContent="center"
        m="auto"
      />
      <AbsoluteCenter
        gap="13px"
        w="55%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        m="auto"
      >
        <Heading size="lg" as="h1" color="gray.50_03" fontSize="57px">
          {growingwith}
        </Heading>
        <Text size="xl" color="gray.300_07" textAlign="center">
          {description}
        </Text>
      </AbsoluteCenter>
    </Box>
  );
}
