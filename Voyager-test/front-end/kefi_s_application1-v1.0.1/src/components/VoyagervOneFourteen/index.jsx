import React from "react";
import { Image, Flex, Box, Text, AbsoluteCenter, Container, Heading } from "@chakra-ui/react";

export default function VoyagervOneFourteen({
  expertiseat = "Expertise at Your Fingertips",
  voyagerapps = "Voyager App&#39;s AI is equipped with specialized knowledge",
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
      <Flex mb="49px" ml={{ md: "50px", base: "0px" }} gap="27px" w="100%" flexDirection="column">
        <Text size="2xl" color="gray.700">
          {voyagerapps}
        </Text>
        <Box>
          <Container
            display="flex"
            flexDirection="column"
            alignItems="end"
            maxW="1320px"
            w="100%"
            px="0px"
            mx="auto"
            p={{ md: "", base: "20px" }}
          >
            <Box zIndex={1} w={{ md: "2%", base: "100%" }}>
              <Box>
                <Box h="173px" position="relative">
                  <Image
                    src="images/img_freepik_screen_1_inject_5.png"
                    h={{ md: "173px", base: "auto" }}
                    w="100%"
                    position="absolute"
                    left="0px"
                    bottom="0px"
                    right="0px"
                    top="0px"
                    justifyContent="center"
                    m="auto"
                  />
                  <Box w="53%" position="absolute" bottom="9%" right="0px" m="auto">
                    <Image
                      src="images/img_freepik_chart_inject_5_gray_50_01_65x12.png"
                      h={{ md: "65px", base: "auto" }}
                      w="100%"
                    />
                    <Image
                      src="images/img_freepik_chart_inject_5_65x12.png"
                      h={{ md: "65px", base: "auto" }}
                      mt="-12px"
                      w="100%"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Flex
              mt="-162px"
              pr={{ base: "20px", sm: "36px" }}
              gap="100px"
              alignSelf="stretch"
              flexDirection={{ md: "row", base: "column" }}
            >
              <Flex
                mt={{ md: "14px", base: "0px" }}
                gap="49px"
                w={{ md: "22%", base: "100%" }}
                flexDirection="column"
                alignItems="center"
              >
                <Box h="248px" alignSelf="stretch" position="relative">
                  <AbsoluteCenter
                    w="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    h="100%"
                    m="auto"
                  >
                    <Box ml={{ md: "44px", base: "0px" }} zIndex={1} w={{ md: "56%", base: "100%" }}>
                      <Box h="175px" position="relative">
                        <AbsoluteCenter
                          w="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          h="100%"
                          m="auto"
                        >
                          <Image src="images/img_freepik_chart_inject_5_gray_50_01_50x34.png" zIndex={1} w="23%" />
                          <Image src="images/img_freepik_screen_2_inject_5.png" ml="-17px" w="77%" />
                        </AbsoluteCenter>
                        <Image
                          src="images/img_freepik_chart_inject_5_indigo_a700.png"
                          h="56px"
                          w="43%"
                          position="absolute"
                          bottom="11%"
                          left="22%"
                          m="auto"
                        />
                        <Flex
                          w="38%"
                          flexDirection="column"
                          alignItems="end"
                          position="absolute"
                          left="31%"
                          top="24%"
                          m="auto"
                        >
                          <Image
                            src="images/img_freepik_chart_inject_5.svg"
                            h={{ md: "50px", base: "auto" }}
                            alignSelf="stretch"
                          />
                          <Image
                            src="images/img_freepik_text_box_inject_5.svg"
                            h="24px"
                            mt="-12px"
                            mr={{ md: "2px", base: "0px" }}
                          />
                        </Flex>
                        <Image
                          src="images/img_freepik_text_box_inject_5_indigo_a700.svg"
                          h="24px"
                          position="absolute"
                          bottom="32%"
                          left="22%"
                          m="auto"
                        />
                        <Image
                          src="images/img_freepik_check_list_inject_5_indigo_800_01.png"
                          h="29px"
                          position="absolute"
                          right="9%"
                          top="13%"
                          m="auto"
                        />
                      </Box>
                    </Box>
                    <Image src="images/img_freepik_floor_inject_5.svg" h="142px" mt="-69px" />
                  </AbsoluteCenter>
                  <Box w="17%" position="absolute" left="1%" top="21%" m="auto">
                    <Box h="131px" position="relative">
                      <AbsoluteCenter
                        w="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="start"
                        h="100%"
                        m="auto"
                      >
                        <Flex mt="22px" zIndex={1} w="33%" flexDirection="column">
                          <Flex zIndex={1} alignSelf="center" flexDirection="column" alignItems="center">
                            <Image src="images/img_vector_36x14.png" zIndex={1} />
                            <Flex mt="-14px" justifyContent="center" alignItems="start">
                              <Image src="images/img_vector_29x20.png" h={{ md: "29px", base: "auto" }} w="100%" />
                              <Image src="images/img_vector_indigo_a200.svg" h="1px" mt="11px" w="1px" />
                            </Flex>
                          </Flex>
                          <Flex mt="-30px" justifyContent="center" alignItems="center">
                            <Image src="images/img_vector.svg" h="30px" />
                            <Flex alignSelf="end" w="18%" justifyContent="center" alignItems="center">
                              <Image
                                src="images/img_vector_blue_gray_800_10x1.svg"
                                h="10px"
                                zIndex={2}
                                alignSelf="start"
                              />
                              <Image src="images/img_vector_blue_gray_800_9x2.svg" h="9px" ml="-1px" zIndex={1} />
                              <Box h="100%" ml="-1px" opacity={0.2} bg="indigo.A700_6c" w="1px" />
                              <Image src="images/img_vector_10x1.svg" h="10px" />
                            </Flex>
                          </Flex>
                        </Flex>
                        <Flex ml="-23px" flex={1} justifyContent="center" alignItems="start">
                          <Image src="images/img_vector_white_a700.svg" h="12px" mt="44px" zIndex={1} />
                          <Flex ml="-9px" flex={1} flexDirection="column">
                            <Flex zIndex={1} flexDirection="column" alignItems="end">
                              <Flex alignSelf="stretch" flexDirection="column">
                                <Flex
                                  ml={{ md: "6px", base: "0px" }}
                                  zIndex={1}
                                  w={{ md: "55%", base: "100%" }}
                                  flexDirection="column"
                                  alignItems="center"
                                >
                                  <Flex flexDirection="column" alignItems="center">
                                    <Flex justifyContent="center">
                                      <Image
                                        src="images/img_vector_18.svg"
                                        h="10px"
                                        mt="2px"
                                        zIndex={1}
                                        alignSelf="end"
                                      />
                                      <Image src="images/img_vector_17.svg" h="10px" ml="-2px" alignSelf="start" />
                                    </Flex>
                                    <Image src="images/defaultNoData.png" mt="-9px" />
                                  </Flex>
                                  <Box h="21px" mt="-20px" alignSelf="stretch" position="relative">
                                    <Image
                                      src="images/img_vector_16.png"
                                      h={{ md: "21px", base: "auto" }}
                                      w="100%"
                                      position="absolute"
                                      left="0px"
                                      bottom="0px"
                                      right="0px"
                                      top="0px"
                                      justifyContent="center"
                                      m="auto"
                                    />
                                    <Image
                                      src="images/img_vector_orange_a200.svg"
                                      h="3px"
                                      position="absolute"
                                      bottom="29%"
                                      left="23%"
                                      m="auto"
                                    />
                                  </Box>
                                </Flex>
                                <Flex mt="-5px" flexDirection="column" alignItems="start">
                                  <Flex alignItems="center">
                                    <Image src="images/img_vector_36x25.png" zIndex={1} />
                                    <Flex ml="-5px" flexDirection="column">
                                      <Image src="images/img_vector_26x15.png" h="26px" zIndex={1} />
                                      <Image
                                        src="images/img_vector_gray_400_8x5.svg"
                                        h="8px"
                                        mt="-4px"
                                        ml={{ md: "2px", base: "0px" }}
                                      />
                                    </Flex>
                                  </Flex>
                                  <Box mt="-7px" w={{ md: "72%", base: "100%" }}>
                                    <Box>
                                      <Image
                                        src="images/img_vector_72x25.png"
                                        h={{ md: "72px", base: "auto" }}
                                        w="100%"
                                      />
                                      <Box h="72px" mt="-72px" position="relative">
                                        <Image
                                          src="images/img_vector_72x25.png"
                                          h={{ md: "72px", base: "auto" }}
                                          w="100%"
                                          position="absolute"
                                          left="0px"
                                          bottom="0px"
                                          right="0px"
                                          top="0px"
                                          justifyContent="center"
                                          m="auto"
                                        />
                                        <Image
                                          src="images/img_vector_indigo_a700.svg"
                                          h="23px"
                                          position="absolute"
                                          right="15%"
                                          top="18%"
                                          m="auto"
                                        />
                                      </Box>
                                    </Box>
                                  </Box>
                                </Flex>
                              </Flex>
                              <Image src="images/img_vector_gray_400_01.svg" h="6px" mt="-2px" zIndex={1} />
                            </Flex>
                            <Flex mt="-9px" alignSelf="center" flexDirection="column">
                              <Flex justifyContent="center" alignItems="center">
                                <Image
                                  src="images/img_vector_gray_400_01_6x7.svg"
                                  h={{ md: "6px", base: "auto" }}
                                  zIndex={1}
                                  alignSelf="end"
                                  w="100%"
                                />
                                <Image src="images/img_vector_gray_400_01_15x7.svg" h="15px" ml="-7px" />
                              </Flex>
                              <Image src="images/img_vector_6x7.svg" h="6px" mt="-5px" />
                            </Flex>
                          </Flex>
                        </Flex>
                      </AbsoluteCenter>
                      <Flex
                        w="37%"
                        flexDirection="column"
                        alignItems="end"
                        position="absolute"
                        bottom="6%"
                        right="1%"
                        m="auto"
                      >
                        <Image src="images/img_vector_gray_400_01_11x17.svg" h="11px" />
                        <Image src="images/img_vector_gray_400_01_4x12.svg" h="4px" mt="-4px" />
                      </Flex>
                      <Image
                        src="images/img_vector_gray_400.svg"
                        h="45px"
                        position="absolute"
                        left="7%"
                        top="18%"
                        m="auto"
                      />
                    </Box>
                  </Box>
                  <Flex
                    w="45%"
                    justifyContent="flex-end"
                    alignItems="start"
                    position="absolute"
                    right="15%"
                    top="4%"
                    m="auto"
                  >
                    <Box h="173px" flex={1} position="relative">
                      <Image
                        src="images/img_freepik_screen_1_inject_5_indigo_a200_01.svg"
                        h="173px"
                        position="absolute"
                        left="0px"
                        bottom="0px"
                        right="0px"
                        top="0px"
                        justifyContent="center"
                        m="auto"
                      />
                      <Box w="51%" position="absolute" bottom="9%" left="11%" m="auto">
                        <Image
                          src="images/img_freepik_chart_inject_5_gray_50_01.svg"
                          h={{ md: "65px", base: "auto" }}
                          alignSelf="stretch"
                        />
                        <Image
                          src="images/img_freepik_chart_inject_5_gray_50_01_65x46.svg"
                          h={{ md: "65px", base: "auto" }}
                          mt="-12px"
                          alignSelf="stretch"
                        />
                      </Box>
                    </Box>
                    <Image
                      src="images/img_freepik_chart_inject_5_gray_300_02.svg"
                      h="61px"
                      mt="30px"
                      ml="-32px"
                      zIndex={1}
                    />
                  </Flex>
                  <Image
                    src="images/img_freepik_speech.svg"
                    h="26px"
                    position="absolute"
                    right="21%"
                    top="10%"
                    m="auto"
                  />
                  <Image
                    src="images/img_freepik_check_list_inject_5.svg"
                    h="34px"
                    position="absolute"
                    right="21%"
                    top="40%"
                    m="auto"
                  />
                </Box>
                <Text
                  size="3xl"
                  color="blue_gray.900_01"
                  letterSpacing="0.40px"
                  textAlign="center"
                  w={{ md: "80%", base: "100%" }}
                >
                  {funding}
                </Text>
              </Flex>
              <Flex
                mt={{ md: "33px", base: "0px" }}
                gap="48px"
                w={{ md: "22%", base: "100%" }}
                flexDirection="column"
                alignItems="center"
              >
                <Image src="images/img_strategic_planning.svg" h={{ md: "229px", base: "auto" }} alignSelf="stretch" />
                <Text
                  size="3xl"
                  color="blue_gray.900_02"
                  letterSpacing="0.40px"
                  textAlign="center"
                  w={{ md: "80%", base: "100%" }}
                >
                  {strategicTwo}
                </Text>
              </Flex>
              <Flex gap="48px" w={{ md: "23%", base: "100%" }} flexDirection="column" alignItems="center">
                <Image src="images/img_eco_support.svg" h={{ md: "263px", base: "auto" }} alignSelf="stretch" />
                <Text
                  size="3xl"
                  color="blue_gray.900"
                  textAlign="center"
                  w={{ md: "76%", base: "100%" }}
                  lineHeight="120%"
                >
                  {ecosystem}
                </Text>
              </Flex>
              <Image
                src="images/img_freepik_floor_inject_5_gray_100.png"
                mt="96px"
                mb="120px"
                w={{ md: "12%", base: "100%" }}
                h="auto"
                my={{ md: 0, base: "0px" }}
              />
              <Text
                size="3xl"
                color="blue_gray.900_02"
                mt={{ md: "288px", base: "0px" }}
                letterSpacing="0.40px"
                textAlign="center"
                w={{ md: "10%", base: "100%" }}
              >
                {description}
              </Text>
              <Flex
                mt="39px"
                mb="178px"
                w={{ md: "7%", base: "100%" }}
                flexDirection="column"
                my={{ md: 0, base: "0px" }}
              >
                <Flex flexDirection="column">
                  <Image src="images/img_freepik_charac.svg" h="90px" ml={{ md: "15px", base: "0px" }} zIndex={1} />
                  <Box h="94px" mt="-41px" position="relative">
                    <Flex w="87%" flexDirection="column" position="absolute" left="0px" top="0px" m="auto">
                      <Box h="85px" zIndex={1} position="relative">
                        <Image
                          src="images/img_vector_85x74.png"
                          h={{ md: "85px", base: "auto" }}
                          w="100%"
                          position="absolute"
                          left="0px"
                          bottom="0px"
                          right="0px"
                          top="0px"
                          justifyContent="center"
                          m="auto"
                        />
                        <Image
                          src="images/img_vector_black_900.svg"
                          h="53px"
                          position="absolute"
                          bottom="2%"
                          left="0px"
                          m="auto"
                        />
                      </Box>
                      <Image
                        src="images/img_vector_blue_gray_700.svg"
                        h="14px"
                        mt="-9px"
                        ml={{ md: "10px", base: "0px" }}
                      />
                    </Flex>
                    <Image
                      src="images/img_vector_blue_gray_700_10x14.svg"
                      h="10px"
                      position="absolute"
                      bottom="36%"
                      right="18%"
                      m="auto"
                    />
                    <Box h="94px" w="92%" position="absolute" right="0px" bottom="0px" top="0px" my="auto">
                      <Image
                        src="images/img_vector_white_a700_94x79.svg"
                        h="94px"
                        position="absolute"
                        left="0px"
                        bottom="0px"
                        right="0px"
                        top="0px"
                        justifyContent="center"
                        m="auto"
                      />
                      <Box
                        h="64px"
                        w="56%"
                        position="absolute"
                        left="0px"
                        bottom="0px"
                        right="0px"
                        top="0px"
                        justifyContent="center"
                        m="auto"
                      >
                        <Image
                          src="images/img_vector_gray_50_01.svg"
                          h="64px"
                          position="absolute"
                          left="0px"
                          bottom="0px"
                          right="0px"
                          top="0px"
                          justifyContent="center"
                          m="auto"
                        />
                        <Flex
                          w="57%"
                          flexDirection="column"
                          alignItems="center"
                          position="absolute"
                          bottom="17%"
                          right="0px"
                          left="0px"
                          m="auto"
                        >
                          <Image src="images/img_vector_blue_gray_800.svg" h="11px" zIndex={1} />
                          <Image src="images/img_vector_indigo_a700_01.svg" h="19px" mt="-2px" />
                        </Flex>
                        <Image
                          src="images/img_vector_indigo_a700_01_8x6.svg"
                          h="8px"
                          position="absolute"
                          bottom="41%"
                          right="40%"
                          m="auto"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}
