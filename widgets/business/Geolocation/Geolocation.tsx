import BodyText from "@components/BodyText";
import Button from "@components/Button";
import Card from "@components/Card";
import GoogleMaps from "@components/GoogleMaps";
import { Box, colors, makeStyles, Theme } from "@material-ui/core";
import React from "react";

import { MdLocationOff, MdNavigation } from "react-icons/md";
import { FiNavigation } from "react-icons/fi";

export interface GeolocationProps {
  hasGeocoding: boolean;
  geocoding:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
}
const useStyles = makeStyles((theme: Theme) => ({
  emptyContainer: {
    borderRadius: theme.shape.borderRadius,
    minHeight: 350,
    backgroundColor: colors.grey[200],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const Geolocation: React.FC<GeolocationProps> = ({
  hasGeocoding,
  geocoding,
}) => {
  const classes = useStyles();

  if (!geocoding || !hasGeocoding)
    return (
      <Box className={classes.emptyContainer}>
        <Box>
          <MdLocationOff size={60} color={colors.grey[800]} />
        </Box>
        <BodyText>No location available</BodyText>
      </Box>
    );

  return (
    <Card
      paddingContent={false}
      title="Localisation"
      headerAction={
        <Button
          color="primary"
          variant="outlined"
          externalHref
          startIcon={<FiNavigation />}
          href={`https://www.google.com/maps/dir/?api=1&destination=${geocoding?.lat},${geocoding?.lng}&travelmode=driving`}
        >
          Take me there
        </Button>
      }
    >
      <GoogleMaps readonly defaultMarker={geocoding} containerHeight={400} />
    </Card>
  );
};

export default Geolocation;
