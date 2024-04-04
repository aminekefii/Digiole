import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({ borderRadius: "0px", outlineOffset: "0", cursor: "pointer" });

const sizes = {
  sm: defineStyle({
    h: "40px",
    fontSize: "16px",
    px: "16px",
  }),
  md: defineStyle({
    h: "48px",
    fontSize: "19px",
    px: "24px",
  }),
  lg: defineStyle({
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
  outline: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      lime_100: {
        borderColor: "lime.100",
        borderWidth: "1px",
        borderStyle: "solid",
        color: "gray.100_01",
      },
      lime_300: {
        borderColor: "lime.300",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "sm",
        color: "white.A700",
      },
    };
    return colorCombinations[colorScheme] || colorCombinations["lime_100"];
  }),
  fill: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      indigo_A700_01: {
        bg: "indigo.A700_01",
        color: "white.A700",
      },
      lime_300: {
        bg: "lime.300",
        color: "blue_gray.900_01",
      },
      lime_200: {
        bg: "lime.200",
        color: "blue_gray.900",
      },
      white_A700: {
        bg: "white.A700",
      },
    };
    return colorCombinations[colorScheme] || colorCombinations["white_A700"];
  }),
};

const Button = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "fill",
    size: "lg",
  },
});
export default Button;
