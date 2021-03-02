import BusinessAvatar from "@components/BusinessAvatar";
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

const useStyles = makeStyles((theme: Theme) => ({}));

const BusinessHeader: React.FC<BusinessHeaderProps> = ({ business }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <BusinessAvatar business={business} />
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
    </Box>
  );
};

export default BusinessHeader;
