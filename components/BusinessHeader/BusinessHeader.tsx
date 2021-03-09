import BusinessAvatar from "@components/BusinessAvatar";
import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import { Avatar, Box, Chip, Grid, makeStyles, Theme } from "@material-ui/core";
import { BusinessModel } from "@models/business";
import capitalize from "helpers/capitalize";
import Image from "next/image";
import React, { Fragment } from "react";

export interface BusinessHeaderProps {
  business: BusinessModel;
  rightAction?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      textAlign: "center",
      flexWrap: "wrap",
    },
  },
  boxAvatar: {
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      flex: "1 1 100%",
    },
  },
  headerRightAction: {
    [theme.breakpoints.down("xs")]: {
      flex: "1 1 100%",
      marginTop: theme.spacing(2),
    },
  },
  separator: {
    [theme.breakpoints.up("xs")]: {
      flex: 1,
      display: "flex",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const BusinessHeader: React.FC<BusinessHeaderProps> = ({
  business,
  rightAction,
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={classes.gridContainer}>
      <Box className={classes.boxAvatar}>
        <BusinessAvatar business={business} />
      </Box>
      <Box>
        <Title>{business.name}</Title>
        <Subtitle>
          {capitalize(business.type)} - {capitalize(business.category)}
        </Subtitle>
        {business.tags instanceof Array &&
          business.tags.map((tag: string) => (
            <Box key={tag} marginRight={0.5} display="inline">
              <Chip label={tag.toUpperCase()} />
            </Box>
          ))}
      </Box>

      <Box className={classes.separator}></Box>

      <Box className={classes.headerRightAction}>{rightAction}</Box>
    </Box>
  );
};

export default BusinessHeader;
