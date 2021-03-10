import React from "react";
import { BusinessModel } from "@models/business";
import { Box, makeStyles, Theme, Avatar } from "@material-ui/core";
import Image from "next/image";

export interface BusinessAvatarProps {
  business: BusinessModel;
  size?: "small" | "large";
}

const useStyles = makeStyles((theme: Theme) => ({
  logoContainer: {
    display: "inline-block",
  },
  businessholderLogo: (size) => ({
    width: size === "large" ? 125 : 90,
    height: size === "large" ? 125 : 90,
    textTransform: "uppercase",
    borderRadius: "100%",
  }),
  logo: {
    borderRadius: "100%",
    // border: `3px solid ${theme.palette.primary.main} !important`,
    objectFit: "cover",
  },
}));

const BusinessAvatar: React.FC<BusinessAvatarProps> = ({
  business,
  size = "large",
}) => {
  const classes = useStyles({ size });
  const logo = business.logo instanceof Array ? business.logo[0] : null;

  const dimensions =
    size === "large" ? { width: 125, height: 125 } : { width: 80, height: 80 };

  return (
    <Box className={classes.logoContainer}>
      {logo && (
        <Image
          className={classes.logo}
          src={logo}
          alt={`Logo from ${business.name}`}
          {...dimensions}
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
