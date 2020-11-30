import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import { Box } from "@material-ui/core";
import React from "react";

export interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <Box marginBottom={4}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Box>
  );
};

export default PageTitle;
