import React from "react";
import NativeCard from "@material-ui/core/Card";
import {
  CardContent,
  CardHeader,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Subtitle from "@components/Subtitle";
import Button from "@components/Button";

export interface CardProps {
  paddingContent?: boolean;
  title?: string;
  headerAction?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    // backgroundColor: lighten("#EBEBEB", 0.3),
    boxShadow: "0px 1px 3px #d7d7d7",
  },
  content: {
    padding: ({ paddingContent }: { paddingContent: boolean }) =>
      paddingContent ? "0px 12px 12px 12px" : "",
  },
}));

const Card: React.FC<CardProps> = (props) => {
  const { children, paddingContent = true, title, headerAction } = props;
  const classes = useStyles({ paddingContent });

  return (
    <NativeCard classes={{ root: classes.card }} elevation={0}>
      <CardHeader title={title} action={headerAction} />
      <div className={classes.content}>{children}</div>
    </NativeCard>
  );
};

export default Card;
