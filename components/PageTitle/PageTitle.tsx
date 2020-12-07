import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import Button from "@components/Button";
import { Box, Link, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export interface PageTitleProps {
  title: string;
  subtitle: string;
  displayBackButton?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  displayBackButton = true,
}) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box marginBottom={4}>
      {displayBackButton && (
        <Box marginBottom={1}>
          <Button
            onClick={router.back}
            startIcon={
              <IoMdArrowRoundBack color={theme.palette.text.secondary} />
            }
            variant="outlined"
            size="small"
          >
            GO BACK
          </Button>
        </Box>
      )}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Box>
  );
};

export default PageTitle;
