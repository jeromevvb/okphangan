import Button from "@components/Button";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import React from "react";

export interface WelcomeHeaderProps {
  showLoginButton?: boolean;
}

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    marginBottom: theme.spacing(8),
    justifyContent: "space-between",
  },
}));

const WelcomeHeader: React.FC<WelcomeHeaderProps> = (props) => {
  const { showLoginButton = true } = props;
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <div>
        <Image
          src="/images/logo.png"
          alt="Logo OK Phangan"
          width={180}
          height={50}
        />
      </div>
      {showLoginButton && (
        <div>
          <Button href="/login" variant="contained" color="primary">
            Join the community
          </Button>
        </div>
      )}
    </div>
  );
};

export default WelcomeHeader;
