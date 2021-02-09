import React, { Fragment } from "react";
import Form from "@components/Form";
import {
  BusinessCreationValues,
  businessCreationSchema,
  createBusiness,
  BusinessModel,
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
import FormCategory from "widgets/onboarding/FormCategory";
import { Box } from "@material-ui/core";

interface EditBusinessProfileProps {
  business?: BusinessModel;
}

const EditBusinessProfile: React.FC<EditBusinessProfileProps> = ({
  business,
}) => {
  const initialValues = business;
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (
    values: BusinessCreationValues,
    formikHelpers: FormikHelpers<BusinessCreationValues>
  ) => {
    try {
      formikHelpers.setStatus(undefined);
      formikHelpers.setSubmitting(true);
      const slug = await createBusiness(user as UserModel, values);
      // redirect
      router.push(`/business/${slug}`);
      formikHelpers.setSubmitting(false);
    } catch (error) {
      formikHelpers.setStatus({ error: error.message });
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Box maxWidth="50%">
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={businessCreationSchema}
        >
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

          <FormInputUpload
            name="logo"
            label="Logo de votre business"
            DropzoneProps={{ maxFiles: 1, accept: "image/jpeg, image/png" }}
          />

          {/*
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
          */}

          <FormSubmitButton fullWidth>Update</FormSubmitButton>
        </Form>
      </Box>
    </Fragment>
  );
};

export default EditBusinessProfile;
