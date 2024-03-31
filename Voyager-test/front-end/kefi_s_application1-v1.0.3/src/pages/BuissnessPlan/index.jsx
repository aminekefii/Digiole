import React from "react";
import { Helmet } from "react-helmet";
import {
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Image,
  Center,
  Input,
  Button,
  Heading,
  Flex,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";

export default function Buissnessplan() {
  return (
    <>
      <Helmet>
        <title>Buissness Plan</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <Box pb={{ md: "83px", base: "20px" }} bg="white.A700_01" w="100%">
        <Box>
          <Flex
            mt="-1px"
            position="relative"
            bg="indigo.A700"
            justifyContent="space-between"
            alignItems="center"
            gap="20px"
            p={{ base: "20px", sm: "23px" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Flex
              ml={{ md: "48px", base: "0px" }}
              alignSelf="end"
              alignItems="start"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Image src="images/img_maximize.svg" h="30px" w={{ base: "100%", sm: "30px" }} />
              <Flex ml={{ base: "0px", sm: "19px" }} gap="4px" alignItems="center">
                <Box h="23px" bg="blue_gray.100" w="1px" />
                <Text size="xl" color="gray.50">
                  Business Plan
                </Text>
                <Box h="23px" bg="blue_gray.100" w="1px" />
              </Flex>
              <Text size="xl" color="gray.400" ml={{ base: "0px", sm: "8px" }} fontWeight={300}>
                Create/Edit with AI Wisdom
              </Text>
            </Flex>
            <Flex
              mr={{ md: "20px", base: "0px" }}
              gap="21px"
              w={{ base: "100%", sm: "7%" }}
              justifyContent="center"
              alignItems="center"
            >
              <Image src="images/img_bell.svg" h="24px" w="24px" />
              <Image src="images/img_avatar.png" borderRadius="50%" h="43px" w="43px" />
            </Flex>
          </Flex>
          <Container
            mt="45px"
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            maxW="1341px"
            w="100%"
            gap="20px"
            px="0px"
            mx="auto"
            flexDirection={{ md: "row", base: "column" }}
            p={{ md: "", base: "20px" }}
          >
            <Flex mt="16px" gap="18px" w={{ md: "24%", base: "100%" }} flexDirection="column" alignItems="start">
              <Box
                ml={{ md: "4px", base: "0px" }}
                pb={{ base: "20px", sm: "21px" }}
                pr={{ base: "20px", sm: "21px" }}
                borderColor="blue_gray.400_5b"
                borderBottomWidth="1px"
                borderStyle="solid"
                alignSelf="stretch"
              >
                <Button
                  size="2xl"
                  variant="outline"
                  colorScheme="indigo_900"
                  rightIcon={<Image src="images/img_news.svg" />}
                  gap="35px"
                  w="100%"
                  borderRadius="8px"
                  px={{ base: "20px", sm: "" }}
                >
                  Explore other assistants
                </Button>
              </Box>
              <Flex gap="9px" alignItems="center">
                <Image src="images/img_settings_gray_700_01.svg" h="24px" w="24px" />
                <Text color="gray.700_01" letterSpacing="-0.05px" alignSelf="start">
                  New Business Plan(name ..
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap={{ md: "97px", base: "48px", sm: "72px" }}
              w={{ md: "69%", base: "100%" }}
              flexDirection="column"
              alignItems="start"
            >
              <Flex
                ml={{ md: "34px", base: "0px" }}
                alignSelf="stretch"
                justifyContent="space-between"
                alignItems="start"
                gap="20px"
                flexDirection={{ md: "row", base: "column" }}
              >
                <Flex mt="12px" gap="23px" w={{ md: "71%", base: "100%" }} flexDirection="column">
                  <Flex gap="4px" alignItems="center">
                    <Image src="images/img_settings_black_900.svg" h="16px" alignSelf="end" w="16px" />
                    <Heading as="h1">Wisdom</Heading>
                  </Flex>
                  <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
                    Hi Alex! I&#39;m excited to help you create your business plan. Let&#39;s start with understanding
                    your area of expertise. Can you tell me about your strengths and what you&#39;re passionate about in
                    your business?
                  </Text>
                  <Flex gap="8px" w={{ md: "14%", base: "100%" }} alignItems="center" flexWrap="wrap">
                    <Image src="images/img_avatar_16x16.png" borderRadius="50%" h="16px" w="16px" />
                    <Heading>Alex</Heading>
                    <Image src="images/img_television.svg" h="14px" />
                  </Flex>
                  <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
                    Absolutely! I&#39;m passionate about sustainable living and have a strong background in
                    environmental science. My strength lies in developing eco-friendly products that help reduce waste.
                  </Text>
                  <Flex gap="4px" alignItems="center">
                    <Image src="images/img_settings_black_900.svg" h="16px" alignSelf="end" w="16px" />
                    <Heading as="h3">Wisdom</Heading>
                  </Flex>
                  <Text color="blue_gray.900_01" letterSpacing="-0.05px" lineHeight="140%">
                    That&#39;s fantastic! Would it be okay to include this as part of your expertise in the business
                    plan?
                  </Text>
                  <Flex gap="8px" w={{ md: "14%", base: "100%" }} alignItems="center" flexWrap="wrap">
                    <Image src="images/img_avatar_16x16.png" borderRadius="50%" h="16px" w="16px" />
                    <Heading as="h4">Alex</Heading>
                    <Image src="images/img_television.svg" h="14px" />
                  </Flex>
                  <Image src="images/img_group_12.svg" h="12px" />
                </Flex>
                <Button
                  size="xl"
                  colorScheme="indigo_50_01"
                  leftIcon={<Image src="images/img_audit02.svg" />}
                  letterSpacing="-0.07px"
                  gap="6px"
                  lineHeight="120%"
                  minW="140px"
                  borderRadius="11px"
                >
                  Check your business Plan
                </Button>
              </Flex>
              <InputGroup w="76%">
                <InputLeftElement>
                  <Image src="images/img_component_19.svg" />
                </InputLeftElement>
                <Input placeholder={`| Message Wisdom...`} pr={{ base: "20px", sm: 0 }} />
                <InputRightElement>
                  <Center w="20px" h="20px">
                    <Image src="images/img_save.svg" />
                  </Center>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
}
