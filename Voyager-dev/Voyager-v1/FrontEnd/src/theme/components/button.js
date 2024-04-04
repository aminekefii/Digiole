import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({ borderRadius: "0px", outlineOffset: "0", cursor: "pointer" });

const sizes = {
  sm: defineStyle({
    h: "40px",
    fontSize: "16px",
    px: "16px",
  }),
  lg: defineStyle({
    h: "48px",
    fontSize: "19px",
    px: "35px",
  }),
  md: defineStyle({
    h: "48px",
    fontSize: "16px",
    px: "24px",
  }),
  xs: defineStyle({
    h: "28px",
    px: "8px",
  }),
};

const variants = {
  fill: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      lime_300_01: {
        bg: "lime.300",
        color: "blue_gray.900_05",
      },
      indigo_A700_01: {
        bg: "indigo.A700_05",
      },
      lime_200: {
        bg: "lime.200",
      },
      white_A700: {
        bg: "white.A700_01",
      },
    };
    return colorCombinations[colorScheme] || colorCombinations["white_A700"];
  }),
  outline: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      lime_100: {
        borderColor: "lime.100",
        borderWidth: "1px",
        borderStyle: "solid",
      },
      lime_300: {
        borderColor: "lime.300",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "xs",
      },
    };
    return colorCombinations[colorScheme] || colorCombinations["lime_100"];
  }),
};

const Button = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "fill",
    size: "md",
  },
});
export default Button;
