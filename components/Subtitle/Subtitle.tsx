import React from "react";
import {
  makeStyles,
  Theme,
  Typography,
  TypographyProps,
} from "@material-ui/core";

export interface SubtitleProps extends TypographyProps {
  children: any;
  strong?: boolean;
  //https://github.com/mui-org/material-ui/issues/19512
  component?: any;
}

const useStyles = makeStyles({
  root: {
    fontWeight: (props: { strong: boolean }) => (props.strong ? 400 : 200),
  },
});

const Subtitle: React.FC<SubtitleProps> = (props) => {
  const { children, strong = false, ...restProps } = props;
  const styles = useStyles({ strong });

  return (
    <Typography
      variant="h6"
      component="h2"
      classes={{ root: styles.root }}
      {...restProps}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
