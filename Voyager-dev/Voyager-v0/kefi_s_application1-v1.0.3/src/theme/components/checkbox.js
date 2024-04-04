import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const sizes = {
  xs: defineStyle({
    control: {
      h: "17px",
      w: "17px",
      borderRadius: "4px",
    },
    label: {},
  }),
};

const variants = {
  primary: defineStyle((props) => {
    const { colorScheme } = props;
    const colorCombinations = {
      control: {
        control: {
          _checked: {},
        },
      },
    };

    return colorCombinations[colorScheme] || colorCombinations["control"];
  }),
};

const Checkbox = defineStyleConfig({
  variants,
  sizes,
  defaultProps: {
    variant: "primary",
    size: "xs",
  },
});
export default Checkbox;
