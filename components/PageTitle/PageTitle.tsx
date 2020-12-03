import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import { Box, Link, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box marginBottom={4}>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Box marginRight={0.3}>
          <IoMdArrowRoundBack
            color={theme.palette.text.secondary}
          ></IoMdArrowRoundBack>
        </Box>
        <Box>
          <Link onClick={router.back} variant="body2" color="textSecondary">
            GO BACK
          </Link>
        </Box>
      </Box>

      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Box>
  );
};

export default PageTitle;
