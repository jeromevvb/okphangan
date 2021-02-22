import {
  ButtonProps as MuiButtonProps,
  CircularProgress,
  makeStyles,
  Theme,
  Link as LinkMD,
} from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface ButtonProps extends MuiButtonProps {
  children: string | React.ReactNode;
  loader?: boolean;
  href?: string;
  externalHref?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: theme.palette.primary.main,
  },
}));

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    href,
    disabled,
    loader,
    externalHref,
    ...restProps
  } = props;
  //nextjs env
  const router = useRouter();
  const classes = useStyles();

  const ButtonComponent = (
    <MuiButton {...restProps} disabled={loader || disabled}>
      {loader && (
        <CircularProgress
          thickness={5}
          size={24}
          className={classes.progress}
        />
      )}
      {children}
    </MuiButton>
  );

  if (href) {
    if (externalHref) {
      return (
        <LinkMD href={href} target={"_blank"} rel="noopener">
          {ButtonComponent}
        </LinkMD>
      );
    }

    return (
      <Link href={href} locale={router?.locale}>
        {ButtonComponent}
      </Link>
    );
  }

  return ButtonComponent;
};

export default Button;
