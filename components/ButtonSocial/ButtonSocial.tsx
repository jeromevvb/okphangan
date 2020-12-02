import React from "react";
import Button from "@components/Button/Button";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { ButtonProps, withStyles } from "@material-ui/core";

export interface ButtonSocialProps extends ButtonProps {
  social: "facebook" | "google";
}

const FacebookButton = withStyles({
  root: {
    backgroundColor: "#3B5998",
    borderColor: "#3B5998",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3B5998",
      borderColor: "#3B5998",
    },
    "&:active": {
      backgroundColor: "#3B5998",
      borderColor: "#3B5998",
    },
    "&:focus": {},
  },
})(Button);

const GoogleButton = withStyles({
  root: {
    backgroundColor: "#BF360C",
    borderColor: "#BF360C",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#BF360C",
      borderColor: "#BF360C",
    },
    "&:active": {
      backgroundColor: "#BF360C",
      borderColor: "#BF360C",
    },
    "&:focus": {},
  },
})(Button);

const ButtonSocial: React.FC<ButtonSocialProps> = (props) => {
  const { social, ...restProps } = props;

  if (social === "facebook") {
    return (
      <FacebookButton
        variant="contained"
        startIcon={<FaFacebookF />}
        {...restProps}
      >
        facebook
      </FacebookButton>
    );
  }

  return (
    <GoogleButton variant="contained" startIcon={<FaGoogle />} {...restProps}>
      google
    </GoogleButton>
  );
};

export default ButtonSocial;
