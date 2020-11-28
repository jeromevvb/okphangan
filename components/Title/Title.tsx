import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";

export interface TitleProps extends TypographyProps {
  children: any;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Typography variant="h4" component="h1">
      {children}
    </Typography>
  );
};

export default Title;
