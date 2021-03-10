import useAuth from "@auth/useAuth";
import Button from "@components/Button";
import useMediaQuery from "@hooks/useMediaQuery";

import { Box, makeStyles } from "@material-ui/core";
import Image from "next/image";
import React from "react";
import UserMenu from "widgets/navbar/UserMenu";

export interface WelcomeHeaderProps {
  showLoginButton?: boolean;
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    marginBottom: theme.spacing(4),
    justifyContent: "space-between",
  },
}));

const WelcomeHeader: React.FC<WelcomeHeaderProps> = (props) => {
  const { showLoginButton = true } = props;
  const classes = useStyles();
  const isXs = useMediaQuery("xs");
  const { user } = useAuth();

  return (
    <div className={classes.navbar}>
      <div>
        <Image
          src="/images/logo.png"
          alt="Logo OKPhangan"
          width={180}
          height={50}
        />
      </div>
      {showLoginButton && !user && (
        <Box marginLeft={1}>
          <Button
            size={isXs ? "small" : "medium"}
            href="/login"
            variant="contained"
            color="primary"
          >
            Join the community
          </Button>
        </Box>
      )}
      {user && (
        <Box>
          <UserMenu onlyAvatar></UserMenu>
        </Box>
      )}
    </div>
  );
};

export default WelcomeHeader;
