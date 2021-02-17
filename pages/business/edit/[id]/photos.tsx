import React, { Fragment } from "react";
import Form from "@components/Form";
import {
  BusinessCreationValues,
  businessCreationSchema,
  BusinessModel,
  updateBusiness,
} from "@models/business";
import { FormikHelpers } from "formik";
import FormInputUpload from "@components/FormInputUpload";
import FormSubmitButton from "@components/FormSubmitButton";
import { Box, Grid } from "@material-ui/core";

import toast from "react-hot-toast";

interface EditBusinessPhotosProps {
  business: BusinessModel;
}

const EditBusinessPhotos: React.FC<EditBusinessPhotosProps> = ({
  business,
}) => {
  const initialValues = business;

  const handleSubmit = async (
    values: BusinessCreationValues,
    formikHelpers: FormikHelpers<BusinessCreationValues>
  ) => {
    try {
      formikHelpers.setStatus(undefined);
      formikHelpers.setSubmitting(true);
      await updateBusiness(values, business.id);
      // redirect
      formikHelpers.setSubmitting(false);
      toast.success("Successfully updated!");
    } catch (error) {
      formikHelpers.setStatus({ error: error.message });
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Box marginTop={5}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={businessCreationSchema}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputUpload
              name="logo"
              maxFiles={1}
              storageUrl={`businesses/${business.id}/logo`}
              label="Logo de votre business"
              DropzoneProps={{ accept: "image/jpeg, image/png" }}
            />

            <FormInputUpload
              name="photos"
              maxFiles={5}
              storageUrl={`businesses/${business.id}/photos`}
              label="Photos de votre business"
              DropzoneProps={{ accept: "image/jpeg, image/png" }}
            />

            <FormSubmitButton fullWidth>Update</FormSubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default EditBusinessPhotos;
