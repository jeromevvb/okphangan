import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import { Avatar, Box, Chip, makeStyles, Theme } from "@material-ui/core";
import { BusinessModel } from "@models/business";
import capitalize from "helpers/capitalize";
import Image from "next/image";
import React, { Fragment } from "react";

export interface BusinessHeaderProps {
  business: BusinessModel;
}

const useStyles = makeStyles((theme: Theme) => ({
  logoContainer: {
    display: "inline-block",
  },
  businessholderLogo: {
    width: 125,
    textTransform: "uppercase",
    borderRadius: "100%",
    height: 125,
  },
  logo: {
    borderRadius: "100%",
    border: `3px solid ${theme.palette.primary.main} !important`,
    objectFit: "cover",
    height: 125,
    width: 125,
  },
}));

const BusinessHeader: React.FC<BusinessHeaderProps> = ({ business }) => {
  const classes = useStyles();
  const logo = business.logo instanceof Array ? business.logo[0] : null;

  return (
    <Fragment>
      <Box className={classes.logoContainer}>
        {logo && (
          <Image
            className={classes.logo}
            src={logo}
            alt={`Logo from ${business.name}`}
            width={125}
            height={125}
          />
        )}
        {!logo && (
          <Avatar classes={{ root: classes.businessholderLogo }}>
            {business.name.substring(0, 2)}
          </Avatar>
        )}
      </Box>
      <Box marginLeft={2}>
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
    </Fragment>
  );
};

export default BusinessHeader;
