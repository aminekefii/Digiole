import React from "react";
import { Button, Image, Text, Heading, Flex, Box, AbsoluteCenter } from "@chakra-ui/react";

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
          mt="63px"
          mb="1060px"
          ml="1291px"
          bgGradient="linear-gradient(180deg, #3745de,#3745de00)"
          w="112px"
          borderRadius="50%"
        />
      </Flex>
      <AbsoluteCenter
        w="85%"
        display="flex"
        justifyContent="center"
        alignItems="start"
        h="100%"
        m="auto"
        flexDirection={{ md: "row", base: "column" }}
      >
        <Heading
          size="lg"
          as="h1"
          color="blue_gray.900_04"
          mt="162px"
          fontSize="57px"
          zIndex={1}
          w={{ md: "60%", base: "100%" }}
        >
          {beginyour}
        </Heading>
        <Flex ml={{ md: "-40px", base: "0px" }} w={{ md: "40%", base: "100%" }} flexDirection="column" alignItems="end">
          <Image src="images/img_mockup_copia_4.png" mr={{ md: "7px", base: "0px" }} zIndex={1} w="369px" h="734px" ml="898px" mt="10px"/>
          <Image src="images/img_group_8399.svg" h={{ md: "567px", base: "auto" }} mt="-39px" alignSelf="stretch" />
        </Flex>
      </AbsoluteCenter>
      <Text
        size="3xl"
        color="gray.700_01"
        letterSpacing="0.46px"
        fontSize="23px"
        fontWeight={400}
        w="41%"
        lineHeight="135%"
        position="absolute"
        left="8%"
        top="25%"
        m="auto"
      >
        {description}
      </Text>
      <Box
        h="453.83px"
        ml="692.12px"
        transform="rotate(101deg)"
        bgGradient="linear-gradient(180deg, #3745de,#3745de00)"
        w="453.83px"
        position="absolute"
        right="21%"
        bottom="0px"
        top="0px"
        my="auto"
        borderRadius="50%"
      />
      <Flex
        borderColor="indigo.800_05"
        borderWidth="2px"
        borderStyle="solid"
        bg="white.A700_01"
        w="75%"
        flexDirection="column"
        alignItems="start"
        position="absolute"
        bottom="12%"
        left="14%"
        p={{ base: "20px", sm: "34px" }}
        m="auto"
        borderRadius="40px"
      >
        <Heading size="s" mt="9px" ml={{ md: "17px", base: "0px" }} fontSize="33px" w={{ md: "39%", base: "100%" }}>
          {title}
        </Heading>
        <Text
          size="xl"
          color="blue_gray.900_05"
          mt="13px"
          ml={{ md: "17px", base: "0px" }}
          w={{ md: "58%", base: "100%" }}
        >
          <Text size="xl" as="span" color="blue_gray.900_05">
            Want to learn more about how Skyview can benefit your ecosystem? Book a call or email us directly at{" "}
          </Text>
          <Text size="xl" as="span" color="blue_gray.900_05">
            info@digiole.com
          </Text>
        </Text>
        <Button
          rightIcon={<Image src="images/img_arrowright_white_a700.svg" />}
          color="white.A700_01"
          mt="27px"
          ml={{ md: "17px", base: "0px" }}
          fontSize="19px"
          fontWeight={500}
          gap="8px"
          borderColor="white.A700_01"
          borderWidth="1px"
          borderStyle="solid"
          bg="indigo.A700_05"
          h="48px"
          minW="172px"
          px={{ base: "20px", sm: "23px" }}
          borderRadius="6px"
        >
          {bookACall}
        </Button>
      </Flex>
      <Button
        rightIcon={<Image src="images/img_arrowright_blue_gray_900.svg" />}
        color="blue_gray.900_04"
        letterSpacing="-0.08px"
        fontWeight={500}
        gap="8px"
        borderColor="blue_gray.900_04"
        borderWidth="1px"
        borderStyle="solid"
        bg="lime.200"
        h="48px"
        minW="231px"
        position="absolute"
        left="8%"
        top="35%"
        px={{ base: "20px", sm: "23px" }}
        m="auto"
        borderRadius="24px"
      >
        {joinTheEarly}
      </Button>
    </Box>
  );
}
