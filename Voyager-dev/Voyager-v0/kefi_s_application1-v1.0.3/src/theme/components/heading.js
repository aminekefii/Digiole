const baseStyle = {
  color: "blue_gray.900_05",
  fontFamily: "Helvetica Neue",
};
const sizes = {
  xl: {
    fontSize: '{"md":"68px","base":"48px"}',
    fontWeight: 700,
    lineHeight: "120%",
  },
  s: {
    fontSize: '{"md":"33px","base":"29px","sm":"31px"}',
    fontWeight: 700,
    lineHeight: "120%",
  },
  md: {
    fontSize: '{"md":"47px","base":"37px","sm":"43px"}',
    fontWeight: 700,
    lineHeight: "120%",
  },
  xs: {
    fontSize: '{"md":"23px","base":"23px","sm":"21px"}',
    fontWeight: 700,
    lineHeight: "120%",
  },
  lg: {
    fontSize: '{"md":"57px","base":"43px","sm":"49px"}',
    fontWeight: 700,
    lineHeight: "120%",
  },
};
const defaultProps = {
  size: "xs",
};

const Heading = {
  baseStyle,
  sizes,
  defaultProps,
};
export default Heading;
