import { ButtonProps as MuiButtonProps, withStyles } from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export interface ButtonProps extends MuiButtonProps {
  children: string;
  href?: string;
}

const Button: React.FC<MuiButtonProps> = (props) => {
  const { children, href, ...restProps } = props;
  //nextjs env
  const router = useRouter();

  const ButtonComponent = <MuiButton {...restProps}>{children}</MuiButton>;

  if (href) {
    return (
      <Link href={href} locale={router?.locale}>
        {ButtonComponent}
      </Link>
    );
  }

  return ButtonComponent;
};

export default Button;
