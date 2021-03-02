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
import FormSubmitButton from "@components/FormSubmitButton";
import FormInputCheckbox from "@components/FormInputCheckbox";
import FormShowIf from "@components/FormShowIf";
import FormGoogleMaps from "@components/FormGoogleMaps";
import { Box, Grid, InputLabel } from "@material-ui/core";
import useMediaQuery from "@hooks/useMediaQuery";
import toast from "react-hot-toast";
import FormCategory from "widgets/onboarding/FormCategory";

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
    <Box marginTop={5} marginBottom={5}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={businessCreationSchema}
      >
        <Grid container spacing={!isSm ? 5 : 0}>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              name="name"
              label="Name of your business"
              helper="The name cannot be update for the moment"
              disabled
              fullWidth
            />

            <FormInputText
              name="email"
              label="Email"
              helper="The email cannot be update for the moment"
              disabled
              fullWidth
            />

            <FormCategory></FormCategory>

            <FormInputText name="website" label="Website" fullWidth />

            <FormInputText
              name="phone"
              label="Phone number"
              helper="This number will be display on your business page"
              fullWidth
            />

            <InputLabel>This phone number has a</InputLabel>
            <Box display="flex">
              <FormInputCheckbox name="hasWhatsapp" label="Whatsapp account" />
              <FormInputCheckbox name="hasLine" label="Line account" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormInputText
              name="facebookPage"
              label="Your facebook page"
              placeholder={"https://www.facebook.com/YOUR-PAGE"}
              helper=""
              fullWidth
            />
            <FormInputText
              name="instagramPage"
              label="Your instagram page"
              placeholder={"https://www.instagram.com/YOUR-PAGE"}
              helper=""
              fullWidth
            />
            <FormInputText
              name="description"
              label="A short description of your business (max 250 words)"
              multiline
              inputProps={{ maxLength: 250 }}
              rows={5}
              fullWidth
            />
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

            <Box textAlign="right" paddingTop={2}>
              <FormSubmitButton fullWidth>Update</FormSubmitButton>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default EditBusinessProfile;
