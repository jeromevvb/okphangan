import React, { Fragment } from "react";
import Form from "@components/Form";
import {
  BusinessCreationValues,
  businessCreationSchema,
  BusinessModel,
  updateBusiness,
} from "@models/business";
import { FormikHelpers } from "formik";
import FormInputText from "@components/FormInputText";
import FormInputUpload from "@components/FormInputUpload";
import FormSubmitButton from "@components/FormSubmitButton";
import useAuth from "@auth/useAuth";
import { UserModel } from "@models/auth";
import FormInputCheckbox from "@components/FormInputCheckbox";
import FormShowIf from "@components/FormShowIf";
import FormGoogleMaps from "@components/FormGoogleMaps";
import { useRouter } from "next/router";
import { Box, Grid } from "@material-ui/core";
import useMediaQuery from "@hooks/useMediaQuery";
import toast from "react-hot-toast";

interface EditBusinessProfileProps {
  business: BusinessModel;
}

const EditBusinessProfile: React.FC<EditBusinessProfileProps> = ({
  business,
}) => {
  const initialValues = business;
  const isSm = useMediaQuery("sm");

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
        <Grid container spacing={!isSm ? 5 : 0}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              name="slug"
              label="Slug"
              helper="The slug cannot be update for the moment"
              disabled
              fullWidth
            />

            <FormInputText
              name="name"
              label="Name of your business"
              helper="The name cannot be update for the moment"
              disabled
              fullWidth
            />

            <FormInputText name="website" label="Website" fullWidth />

            <FormInputText
              name="phone"
              label="Phone number"
              helper="This number will be display on your business page"
              fullWidth
            />

            {/* <FormCategory></FormCategory> */}

            <FormInputText
              name="description"
              label="A short description of your business (max 250 words)"
              multiline
              inputProps={{ maxLength: 250 }}
              rows={5}
              fullWidth
            />

            {/* <FormInputUpload
              name="logo"
              maxFiles={1}
              storageUrl={`businesses/${business.id}/logo`}
              label="Logo de votre business"
              DropzoneProps={{ accept: "image/jpeg, image/png" }}
            /> */}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputCheckbox
              name="hasGeocoding"
              label="My business has a physical address"
            />

            <FormShowIf fieldName="hasGeocoding" is={true}>
              <FormGoogleMaps
                label="Indicate where is located your business by clicking on the map"
                name="geocoding"
              />
            </FormShowIf>
            <Grid item xs={12}>
              <FormSubmitButton fullWidth>Update</FormSubmitButton>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default EditBusinessProfile;
