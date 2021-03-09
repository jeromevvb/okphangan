import React from "react";
import { BusinessModel } from "@models/business";
import { Box, makeStyles, Theme, Avatar } from "@material-ui/core";
import Image from "next/image";

export interface BusinessAvatarProps {
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
    // border: `3px solid ${theme.palette.primary.main} !important`,
    objectFit: "cover",
    height: 125,
    width: 125,
  },
}));

const BusinessAvatar: React.FC<BusinessAvatarProps> = ({ business }) => {
  const classes = useStyles();
  const logo = business.logo instanceof Array ? business.logo[0] : null;

  return (
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
  );
};

export default BusinessAvatar;
