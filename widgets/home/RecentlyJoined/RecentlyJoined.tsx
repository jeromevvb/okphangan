import BusinessCard from "@components/BusinessCard";
import useAsync from "@hooks/useAsync";
import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { getRecentlyJoined } from "@models/business";
import React from "react";

export interface RecentlyJoinedProps {}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "-8px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  card: {
    padding: "8px",
    flexBasis: "33%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      flexBasis: "100%",
    },
  },
}));

const RecentlyJoined: React.FC<RecentlyJoinedProps> = (props) => {
  const { result, error, loading } = useAsync(getRecentlyJoined);
  const classes = useStyles();

  if (loading) return <CircularProgress></CircularProgress>;
  if (error) return <></>;

  return (
    <Box display="flex" alignItems="stretch" className={classes.container}>
      {result?.map((business) => (
        <Box className={classes.card} boxSizing="border-box">
          <BusinessCard business={business} />
        </Box>
      ))}
    </Box>
  );
};

export default RecentlyJoined;
