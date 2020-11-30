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
}

const useStyles = makeStyles({
  root: {
    fontWeight: (props: { strong: boolean }) => (props.strong ? 400 : 200),
  },
});

const Subtitle: React.FC<SubtitleProps> = ({ children, strong = false }) => {
  const styles = useStyles({ strong });
  return (
    <Typography variant="h6" component="h2" classes={{ root: styles.root }}>
      {children}
    </Typography>
  );
};

export default Subtitle;
