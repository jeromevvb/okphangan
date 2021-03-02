import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";

export interface TitleProps extends TypographyProps {
  children: any;
}

const Title: React.FC<TitleProps> = ({ children, variant = "h4" }) => {
  return (
    <Typography variant={variant} component="h1">
      {children}
    </Typography>
  );
};

export default Title;
