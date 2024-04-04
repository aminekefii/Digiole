import React from "react";
import { Image, Flex, Text, IconButton, Container, Box } from "@chakra-ui/react";

export default function AssistantsComp({ pagetitle = "Page Title", link, ...props }) {
  return (
    <Box {...props}>
      <Flex
        pt="8px"
        alignSelf="stretch"
        bg="gray.300_01"
        justifyContent="center"
        alignItems="center"
        px="8px"
        as="header"
      >
        <Box
          h="12px"
          ml="6px"
          borderColor="black.900_28"
          borderWidth="1px"
          borderStyle="solid"
          bg="deep_orange.300"
          w="12px"
          borderRadius="6px"
        />
        <Box
          h="12px"
          ml="8px"
          borderColor="black.900_28"
          borderWidth="1px"
          borderStyle="solid"
          bg="orange.A100"
          w="12px"
          borderRadius="6px"
        />
        <Box
          h="12px"
          ml="8px"
          borderColor="black.900_28"
          borderWidth="1px"
          borderStyle="solid"
          bg="green.400"
          w="12px"
          borderRadius="6px"
        />
        <Box h="8px" ml="6px" alignSelf="end" bg="white.A700_01" w="8px" />
        <Flex
          borderTopLeftRadius="8px"
          borderTopRightRadius="8px"
          bg="white.A700_01"
          w="18%"
          justifyContent="space-between"
          gap="20px"
          p="6px"
        >
          <Flex ml={{ md: "6px", base: "0px" }} gap="8px" alignItems="center">
            <Image src="images/img_vscode_icons_fi.png" w="16px" />
            <Text size="xs" color="gray.800_01" letterSpacing="0.24px" fontFamily="Roboto" alignSelf="end">
              {pagetitle}
            </Text>
          </Flex>
          <Image src="images/img_arrow_right.svg" h="16px" w="16px" />
        </Flex>
        <Box h="8px" alignSelf="end" bg="white.A700_01" w="8px" />
        <Image src="images/img_arrow_right.svg" h="28px" w="28px" />
      </Flex>
      <Box alignSelf="stretch" bg="white.A700_01">
        <Box bg="white.A700_01" boxShadow="xs" p="5px">
          <Container
            mb="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxW="1424px"
            w="100%"
            px="0px"
            mx="auto"
            flexDirection={{ md: "row", base: "column" }}
          >
            <IconButton
              icon={<Image src="images/img_arrow_left.svg" />}
              aria-label="I2547:12529;509:28703-arrowleft_one"
              w="28px"
            />
            <IconButton
              icon={<Image src="images/img_icon_next.svg" />}
              aria-label="I2547:12529;509:28700-arrowleft_three"
              ml={{ md: "4px", base: "0px" }}
              w="28px"
            />
            <IconButton
              icon={<Image src="images/img_icon_refresh.svg" />}
              aria-label="I2547:12529;509:28697-qrcode_one"
              ml={{ md: "4px", base: "0px" }}
              w="28px"
            />
            <Flex
              ml={{ md: "12px", base: "0px" }}
              bg="blue_gray.50"
              flex={1}
              justifyContent="space-between"
              gap="20px"
              borderRadius="14px"
              alignSelf="stretch"
            >
              <Flex alignItems="center">
                <Image src="images/img_security.svg" h="28px" />
                <Text size="md" color="gray.800_01" letterSpacing="0.28px" fontFamily="Roboto">
                  <Text size="md" as="span" color="gray.800_01">
                    www.domain.com
                  </Text>
                  <Text size="md" as="span" color="#8c9099">
                    /
                  </Text>
                </Text>
              </Flex>
              <Flex w="3%" justifyContent="center" p="6px">
                <Image
                  src="images/img_star_16x16.svg"
                  h="16px"
                  borderColor="gray.800_01"
                  borderWidth="1px"
                  borderStyle="solid"
                  w="16px"
                />
              </Flex>
            </Flex>
            <Image src="images/img_ellipse.png" borderRadius="50%" h="20px" ml={{ md: "16px", base: "0px" }} w="20px" />
            <Image
              src="images/img_icon_more_actions.svg"
              h="28px"
              ml={{ md: "8px", base: "0px" }}
              w={{ md: "28px", base: "100%" }}
            />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
