import { ButtonProps as MuiButtonProps } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import React from "react";

interface ButtonProps extends MuiButtonProps {
  children: string;
}

const Button: React.FC<MuiButtonProps> = (props) => {
  const { children, ...restProps } = props;

  return <MuiButton {...restProps}>{children}</MuiButton>;
};

export default Button;
