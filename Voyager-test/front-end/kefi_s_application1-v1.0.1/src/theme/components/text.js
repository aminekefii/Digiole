const baseStyle = {
  color: "gray.100_01",
  fontFamily: "Helvetica Neue",
};
const sizes = {
  xs: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "15px",
  },
  lg: {
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: "120%",
  },
  s: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "140%",
  },
  "2xl": {
    fontSize: "19px",
    fontWeight: 400,
    lineHeight: "130%",
  },
  "3xl": {
    fontSize: "20px",
    fontWeight: 400,
  },
  "4xl": {
    fontSize: '{"md":"23px","base":"23px","sm":"21px"}',
    fontWeight: 500,
    lineHeight: "120%",
  },
  xl: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "140%",
  },
  md: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
  },
};
const defaultProps = {
  size: "xl",
};

const Text = {
  baseStyle,
  sizes,
  defaultProps,
};
export default Text;
