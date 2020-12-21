import React, { Fragment, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, InputLabel } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

declare global {
  interface Window {
    google: any;
  }
}

//ko phangan
const center = {
  lat: 9.739868975771625,
  lng: 100.01261920006263,
};

export type MarkerPosition = { lat: number; lng: number };

interface GoogleMapsProps {
  defaultMarker?: MarkerPosition;
  readonly?: boolean;
  onClickMap?(position: MarkerPosition): void;
  containerHeight?: number;
}

const GoogleMaps: React.FC<GoogleMapsProps> = (props) => {
  const {
    defaultMarker = null,
    readonly = false,
    onClickMap,
    containerHeight = 300,
  } = props;
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState<MarkerPosition | null>(defaultMarker);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const onLoad = React.useCallback((map) => {
    setMap(map);
    if (marker) {
      map.setCenter(marker);
      map.setZoom(13);
    }
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
    if (readonly) return false;

    const position = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };

    setMarker(position);
    if (onClickMap) onClickMap(position);

    // fetchAddress(position);
    if (map !== null) {
      //@ts-ignore
      map.setCenter(position);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDY3io_Oscwgp34fWD-c6WUvE6jlMk_rJE">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: `${containerHeight}px` }}
        center={center}
        zoom={11.9}
        onClick={onMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: readonly,
          fullscreenControl: false,
          mapTypeControl: false,
          disableDoubleClickZoom: !readonly,
        }}
      >
        {marker && <Marker position={marker}></Marker>}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(GoogleMaps);
