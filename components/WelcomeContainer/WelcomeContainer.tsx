import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  left: {
    flex: "60%",
    minHeight: "100%",
  },
  right: {
    borderLeft: `5px solid ${theme.palette.grey[800]}`,
    flex: "40%",
    minHeight: "100%",
    backgroundColor: "red",
    backgroundImage: "url(images/background-phangan.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export interface WelcomeContainerProps {
  children: any;
}

const WelcomeContainer: React.FC<WelcomeContainerProps> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.left}>{children}</div>
        <div className={classes.right} />
      </div>
    </Fragment>
  );
};

export default WelcomeContainer;
