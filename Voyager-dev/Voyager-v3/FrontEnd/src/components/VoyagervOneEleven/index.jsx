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
        w={{ base: "100%", md: "46%" }}
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
          mb={{ base: "100px", md: "1060px" }}
          ml={{ base: "0px", md: "1291px" }}
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
        flexDirection={{ base: "row", md: "row" }}
        zIndex={2}
      >
        <Heading
          size="lg"
          as="h1"
          color="blue_gray.900_04"
          mt={{ base: "20px", md: "162px" }}
          fontSize={{ base: "32px", md: "47px" }}
          w={{ base: "100%", md: "60%" }}
          textAlign={{ base: "center", md: "left" }}
          mr={{ base: "0px", md: "10px" }}
        >
          {beginyour}
        </Heading>
        <Flex
          ml={{ base: "0px", md: "-30px" }}
          w={{ base: "70%", md: "50%" }}
          flexDirection="column"
          alignItems="center"
          zIndex={1}
          position="relative"
          mt={{ base: "0px", md: "0px" }}
        >
          <Image
            src="images/img_mockup_copia_4.png"
            mr={{ base: "0px", md: "7px" }}
            w={{ base: "50%", md: "369px" }}
            h="auto"
            zIndex={1}
            position="relative"
            mt={{ base: "0px", md: "0px" }}
          />
          <Image
            src="images/img_group_8399.svg"
            h={{ base: "auto", md: "560px" }}
            position="relative"
            zIndex={2}
            mt={{ base: "200px", md: "0px" }}
            
          />
        </Flex>
      </AbsoluteCenter>
      <Text
        size="3xl"
        color="gray.700_01"
        letterSpacing="0.46px"
        fontSize={{ base: "18px", md: "23px" }}
        fontWeight={400}
        w={{ base: "80%", md: "41%" }}
        lineHeight="135%"
        position="absolute"
        left="8%"
        top={{ base: "20%", md: "27%" }}
        textAlign={{ base: "center", md: "left" }}
        m="auto"
      >
        {description}
      </Text>
      <Box
        h={{ base: "200px", md: "453.83px" }}
        ml={{ base: "0px", md: "692.12px" }}
        transform="rotate(-100deg)"
        bgGradient="linear-gradient(180deg, #3745de, #3745de00)"
        w={{ base: "200px", md: "453.83px" }}
        position="absolute"
        right="21%"
        bottom="0px"
        top="0px"
        my="auto"
        borderRadius="50%"
        zIndex={0}
      />
      <Flex
        borderColor="indigo.800_05"
        borderWidth="2px"
        borderStyle="solid"
        bg="white.A700_01"
        w={{ base: "70%", md: "70%" }}
        flexDirection="column"
        alignItems="start"
        position="absolute"
        bottom={{ base: "10%", md: "12%" }}
        left="14%"
        p={{ base: "20px", sm: "34px" }}
        m="auto"
        borderRadius="40px"
        zIndex={1}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading
          size="s"
          mt="9px"
          ml={{ base: "0px", md: "17px" }}
          fontSize={{ base: "24px", md: "33px" }}
          w={{ base: "100%", md: "39%" }}
        >
          {title}
        </Heading>
        <Text
          size="xl"
          color="blue_gray.900_05"
          mt="13px"
          ml={{ base: "0px", md: "17px" }}
          w={{ base: "100%", md: "58%" }}
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
          ml={{ base: "0px", md: "17px" }}
          fontSize={{ base: "16px", md: "19px" }}
          fontWeight={500}
          gap="8px"
          borderColor="white.A700_01"
          borderWidth="1px"
          borderStyle="solid"
          bg="indigo.A700_05"
          h="48px"
          minW="172px"
          px={{ base: "20px", sm: "23px" }}
          borderRadius="20px"
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
        left={{ base: "20%", md: "20%" }}
        top={{ base: "12%", md: "42%" }}
        px={{ base: "20px", sm: "23px" }}
        m="auto"
        borderRadius="24px"
        
      >
        {joinTheEarly}
      </Button>
    </Box>
  );
}
