import React from "react";
import { Button, Image, Box, Text, Heading, Flex, AbsoluteCenter } from "@chakra-ui/react";

export default function VoyagervOneEleven({
  beginyour = "Begin Your Voyage with Voyager",
  description = "Gain the competitive edge your startup needs. Sign up for early access to Voyager App and start navigating the startup ecosystem with confidence and precision.",
  title = (
    <>
      Still have questions? <br />
      Let’s talk{" "}
    </>
  ),
  tryoutour,
  bookACall = "Book a call",
  joinTheEarly = "Join the Early Access",
  ...props
}) {
  return (
    <Box {...props}>
      <Flex
        bgGradient="linear-gradient(180deg, #fbfdf3,#fbfdf300)"
        w="46%"
        flexDirection="column"
        alignItems="end"
        position="absolute"
        right="0px"
        bottom="0px"
        top="0px"
        h="max-content"
        p={{ base: "20px", sm: "37px" }}
        my="auto"
      >
        <Box
          h="112px"
          mt="26px"
          mb="1060px"
          bgGradient="linear-gradient(180deg, #3745de,#3745de00)"
          w="112px"
          borderRadius="50%"
        />
      </Flex>
      <Heading
        size="lg"
        as="h1"
        color="blue_gray.900"
        fontSize="57px"
        w="48%"
        position="absolute"
        left="8%"
        top="13%"
        m="auto"
      >
        {beginyour}
      </Heading>
      <AbsoluteCenter
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="start"
        h="100%"
        m="auto"
        flexDirection={{ md: "row", base: "column" }}
      >
        <Text
          size="4xl"
          color="gray.700"
          mt="312px"
          letterSpacing="0.46px"
          fontSize="23px"
          fontWeight={400}
          zIndex={1}
          w={{ md: "34%", base: "100%" }}
          lineHeight="135%"
        >
          {description}
        </Text>
        <Flex ml={{ md: "-460px", base: "0px" }} flex={1} flexDirection="column" alignItems="end">
          <Image src="images/img_mockup_copia_4.png" mr={{ md: "7px", base: "0px" }} zIndex={1} w="35%" />
          <Box h="567px" mt="-39px" alignSelf="stretch" position="relative">
            <Flex
              borderColor="indigo.800_02"
              borderWidth="2px"
              borderStyle="solid"
              bg="white.A700"
              w="87%"
              flexDirection="column"
              alignItems="start"
              position="absolute"
              left="0px"
              top="16%"
              p={{ base: "20px", sm: "34px" }}
              m="auto"
              borderRadius="40px"
            >
              <Heading
                size="s"
                mt="9px"
                ml={{ md: "17px", base: "0px" }}
                fontSize="33px"
                w={{ md: "39%", base: "100%" }}
              >
                {title}
              </Heading>
              <Text
                size="2xl"
                color="blue_gray.900_01"
                mt="13px"
                ml={{ md: "17px", base: "0px" }}
                w={{ md: "58%", base: "100%" }}
              >
                <Text size="2xl" as="span" color="blue_gray.900_01">
                  Want to learn more about how Skyview can benefit your ecosystem? Book a call or email us directly at{" "}
                </Text>
                <Text size="2xl" as="span" color="blue_gray.900_01">
                  info@digiole.com
                </Text>
              </Text>
              <Button
                size="md"
                colorScheme="indigo_A700_01"
                rightIcon={<Image src="images/img_arrowright_white_a700.svg" />}
                mt="27px"
                ml={{ md: "17px", base: "0px" }}
                fontWeight={500}
                gap="8px"
                borderColor="white.A700"
                borderWidth="1px"
                borderStyle="solid"
                minW="172px"
                borderRadius="6px"
                px={{ base: "20px", sm: "" }}
              >
                {bookACall}
              </Button>
            </Flex>
            <Image
              src="images/img_group_8399.svg"
              h="567px"
              position="absolute"
              right="0px"
              bottom="0px"
              top="0px"
              my="auto"
            />
          </Box>
        </Flex>
      </AbsoluteCenter>
      <Box
        h="534px"
        mr="302px"
        transform="rotate(101deg)"
        bgGradient="linear-gradient(180deg, #3745de,#3745de00)"
        w="534px"
        position="absolute"
        right="21%"
        bottom="0px"
        top="0px"
        my="auto"
        borderRadius="50%"
      />
      <Button
        colorScheme="lime_200"
        rightIcon={<Image src="images/img_arrowright_blue_gray_900.svg" />}
        letterSpacing="-0.08px"
        fontWeight={500}
        gap="8px"
        borderColor="blue_gray.900"
        borderWidth="1px"
        borderStyle="solid"
        minW="231px"
        position="absolute"
        left="8%"
        top="37%"
        m="auto"
        borderRadius="24px"
        px={{ base: "20px", sm: "" }}
      >
        {joinTheEarly}
      </Button>
    </Box>
  );
}
