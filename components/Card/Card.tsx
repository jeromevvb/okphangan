import React from "react";
import NativeCard from "@material-ui/core/Card";
import {
  CardHeader,
  makeStyles,
  Theme,
  CardProps as NativeCardProps,
} from "@material-ui/core";

export interface CardProps extends NativeCardProps {
  paddingContent?: boolean;
  title?: string;
  headerAction?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    // backgroundColor: lighten("#EBEBEB", 0.3),
    // boxShadow: "0px 1px 3px #d7d7d7",
  },
  content: {
    padding: ({ paddingContent }: { paddingContent: boolean }) =>
      paddingContent ? "0px 16px 16px 16px" : "",
  },
}));

const Card: React.FC<CardProps> = (props) => {
  const {
    children,
    paddingContent = true,
    title,
    headerAction,
    ...restProps
  } = props;
  const classes = useStyles({ paddingContent });

  return (
    <NativeCard classes={{ root: classes.card }} elevation={0} {...restProps}>
      {(title || headerAction) && (
        <CardHeader title={title} action={headerAction} />
      )}
      <div className={classes.content}>{children}</div>
    </NativeCard>
  );
};

export default Card;
