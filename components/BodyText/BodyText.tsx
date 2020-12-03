import React from "react";
import { makeStyles, Theme, TypographyProps } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

type FontWeight = "extraLight" | "light" | "regular" | "bold";

export interface BodyTextProps extends TypographyProps {
  variant?: "body1" | "body2";
  fontWeight?: FontWeight;
  children: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontWeight: (props: { fontWeight: FontWeight }) =>
      props.fontWeight == "extraLight"
        ? 200
        : props.fontWeight == "light"
        ? 300
        : props.fontWeight == "regular"
        ? 400
        : // TODO:BOLD
          400,
  },
}));

const BodyText: React.FC<BodyTextProps> = (props) => {
  const {
    variant = "body1",
    children,
    fontWeight = "light",
    ...restProps
  } = props;
  const classes = useStyles({ fontWeight });

  return (
    <Typography
      variant={variant}
      {...restProps}
      classes={{ root: classes.root }}
    >
      {children}
    </Typography>
  );
};

export default BodyText;
