import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WelcomeHeader from "@components/WelcomeHeader";
import { WelcomeHeaderProps } from "@components/WelcomeHeader/WelcomeHeader";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  left: {
    flex: "60%",
    minHeight: "100%",
    padding: theme.spacing(2),
  },
  right: {
    borderLeft: `5px solid ${theme.palette.grey[900]}`,
    flex: "40%",
    minHeight: "100%",
    backgroundColor: theme.palette.grey[300],
    backgroundImage: "url(images/background-phangan.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export interface WelcomeLayoutProps {
  children: any;
  fluidLeft?: boolean;
  HeaderProps?: WelcomeHeaderProps;
}

const WelcomeLayout: React.FC<WelcomeLayoutProps> = (props) => {
  const { children, HeaderProps, fluidLeft = true } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.left}>
          <Box maxWidth={fluidLeft ? "100%" : 600} margin="auto">
            <WelcomeHeader {...HeaderProps} />
            {children}
          </Box>
        </div>
        <div className={classes.right} />
      </div>
    </Fragment>
  );
};

export default WelcomeLayout;
