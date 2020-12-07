import React, { Fragment, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, InputLabel } from "@material-ui/core";
import BodyText from "@components/BodyText";
import Alert from "@material-ui/lab/Alert";
import { FormikValues, useFormikContext } from "formik";

declare global {
  interface Window {
    google: any;
  }
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

//ko phangan
const center = {
  lat: 9.739868975771625,
  lng: 100.01261920006263,
};

type MarkerPosition = { lat: number; lng: number };
interface GoogleMapsOnboardingProps {
  name: string;
  label: string;
}

const GoogleMapsOnboarding: React.FC<GoogleMapsOnboardingProps> = (props) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState<MarkerPosition | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const { values, setFieldValue, touched, errors } = useFormikContext<
    FormikValues
  >();
  const { name, label } = props;

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  // const fetchAddress = async (position: MarkerPosition) => {
  //   const positionUrl = `${position.lat},${position.lng}`;
  //   const geocoding = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionUrl}&key=AIzaSyDY3io_Oscwgp34fWD-c6WUvE6jlMk_rJE`
  //   );
  //   const data = await geocoding.json();
  //   const address = data?.results[0].formatted_address;

  //   setSelectedAddress(address);
  // };

  const onMapClick = (clickEvent: any) => {
    const position = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };

    setMarker(position);
    setFieldValue(name, position);

    // fetchAddress(position);
    if (map !== null) {
      //@ts-ignore
      map.setCenter(position);
    }
  };

  return (
    <Box marginBottom={2}>
      <Box>
        <InputLabel>{label}</InputLabel>
        {selectedAddress && (
          <Box marginBottom={1}>
            <Alert severity="info">
              Your address:
              <br />
              <b>{selectedAddress}</b>
            </Alert>
          </Box>
        )}
      </Box>
      <LoadScript googleMapsApiKey="AIzaSyDY3io_Oscwgp34fWD-c6WUvE6jlMk_rJE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11.9}
          onClick={onMapClick}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            disableDoubleClickZoom: true,
          }}
        >
          {marker && (
            <Marker position={marker} title="Your business place"></Marker>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default React.memo(GoogleMapsOnboarding);
