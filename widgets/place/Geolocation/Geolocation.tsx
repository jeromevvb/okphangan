import Button from "@components/Button";
import Card from "@components/Card";
import GoogleMaps from "@components/GoogleMaps";
import React from "react";

export interface GeolocationProps {
  geocoding:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
}

const Geolocation: React.FC<GeolocationProps> = ({ geocoding }) => {
  return (
    <Card
      paddingContent={false}
      title="Localisation"
      headerAction={
        <Button
          color="primary"
          externalHref
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
