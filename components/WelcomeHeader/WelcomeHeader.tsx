import useAuth from "@auth/useAuth";
import Button from "@components/Button";

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
  const { user } = useAuth();

  return (
    <div className={classes.navbar}>
      <div>
        <Image
          src="/images/logo.png"
          alt="Logo OKPhangan"
          width={200}
          height={50}
        />
      </div>
      {showLoginButton && !user && (
        <div>
          <Button href="/login" variant="contained" color="primary">
            Join the community
          </Button>
        </div>
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
