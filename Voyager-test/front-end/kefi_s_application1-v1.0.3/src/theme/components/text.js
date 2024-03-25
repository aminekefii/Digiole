const baseStyle = {
  color: "gray.100_03",
  fontFamily: "Helvetica Neue",
};
const sizes = {
  xs: {
    fontSize: "5px",
    fontWeight: 200,
    lineHeight: "15px",
  },
  lg: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "140%",
  },
  s: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
  },
  "2xl": {
    fontSize: "20px",
    fontWeight: 400,
  },
  "3xl": {
    fontSize: '{"md":"23px","base":"23px","sm":"21px"}',
    fontWeight: 500,
    lineHeight: "120%",
  },
  xl: {
    fontSize: "19px",
    fontWeight: 400,
    lineHeight: "130%",
  },
  md: {
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: "120%",
  },
};
const defaultProps = {
  size: "lg",
};

const Text = {
  baseStyle,
  sizes,
  defaultProps,
};
export default Text;
