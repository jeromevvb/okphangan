import GoogleMaps, { MarkerPosition } from "@components/GoogleMaps";
import { Box, InputLabel } from "@material-ui/core";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

export interface FormGoogleMapsProps {
  name: string;
  label: string;
}

const FormGoogleMaps: React.FC<FormGoogleMapsProps> = ({ name, label }) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<
    FormikValues
  >();

  const handleClickMap = (position: MarkerPosition) => {
    setFieldValue(name, position);
  };

  return (
    <Box marginBottom={2}>
      <Box>
        <InputLabel>{label}</InputLabel>
      </Box>
      <GoogleMaps onClickMap={handleClickMap} />
    </Box>
  );
};

export default FormGoogleMaps;
