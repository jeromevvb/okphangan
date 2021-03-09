import React, { Fragment } from "react";
import { BusinessModel } from "@models/business";
import FormInputUpload from "@components/FormInputUpload";
import { Box, Grid } from "@material-ui/core";

interface EditBusinessPhotosProps {
  business: BusinessModel;
}

const EditBusinessPhotos: React.FC<EditBusinessPhotosProps> = ({
  business,
}) => {
  return (
    <Box marginTop={5}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputUpload
            name="logo"
            maxFiles={1}
            firestoreUrl={`businesses/${business.id}`}
            label="Logo of your business"
            DropzoneProps={{ accept: "image/jpeg, image/png" }}
          />

          <FormInputUpload
            name="photos"
            maxFiles={5}
            firestoreUrl={`businesses/${business.id}`}
            label="Best pictures of your business"
            DropzoneProps={{ accept: "image/jpeg, image/png" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditBusinessPhotos;
