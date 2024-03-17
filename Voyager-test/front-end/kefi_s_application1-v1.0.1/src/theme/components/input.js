import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({ field: { borderColor: "indigo.50", borderWidth: "1px", borderRadius: "6px" } });

const sizes = {
  xs: defineStyle({
    field: {
      px: "20px",
      height: "48px",
    },
  }),
};

const variants = {
  outline: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      indigo_50: {
        field: {
          borderColor: "indigo.50",
          borderWidth: "1px",
          borderStyle: "solid",
        },
      },
    };
    return colorCombinations[colorScheme] || colorCombinations["indigo_50"];
  }),
};

const Input = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "outline",
    size: "xs",
  },
});
export default Input;
