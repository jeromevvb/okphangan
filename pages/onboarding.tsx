import React from "react";
import UserAuthGranted from "@auth/UserAuthGranted";
import Page from "@components/Page";
import WelcomeLayout from "@components/WelcomeLayout";
import PageTitle from "@components/PageTitle";
import Form from "@components/Form";
import {
  BusinessCreationValues,
  businessCreationSchema,
  updateBusiness,
  BusinessModel,
} from "@models/business";
import { FormikHelpers } from "formik";
import FormInputText from "@components/FormInputText";
import FormInputUpload from "@components/FormInputUpload";
import FormSubmitButton from "@components/FormSubmitButton";
import useAuth from "@auth/useAuth";
import FormInputCheckbox from "@components/FormInputCheckbox";
import FormShowIf from "@components/FormShowIf";
import FormGoogleMaps from "@components/FormGoogleMaps";
import { useRouter } from "next/router";
import FormCategory from "widgets/onboarding/FormCategory";
import useDocument from "@hooks/useDocument";

interface OnboardingProps {}

const OnboardingComponent: React.FC<OnboardingProps> = ({}) => {
  const router = useRouter();
  const { user } = useAuth();

  const initialValues = {
    ...businessCreationSchema.default(),
    email: user?.email,
  };

  const handleSubmit = async (
    values: BusinessCreationValues,
    formikHelpers: FormikHelpers<BusinessCreationValues>
  ) => {
    try {
      formikHelpers.setStatus(undefined);
      formikHelpers.setSubmitting(true);
      const slug = await updateBusiness(values, user?.businessId);
      // redirect
      router.push(`/business/${slug}`);
      formikHelpers.setSubmitting(false);
    } catch (error) {
      formikHelpers.setStatus({ error: error.message });
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Page title="Create your business page">
      <WelcomeLayout fluidLeft={false} HeaderProps={{ showLoginButton: false }}>
        <PageTitle
          displayBackButton={false}
          title="Let's get to know you a bit more"
          subtitle="Provide us few details about your business"
        />

        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={businessCreationSchema}
        >
          <FormInputText name="name" label="Name of your business" fullWidth />

          <FormInputText label="Email" name="email" fullWidth />

          <FormInputText
            name="website"
            label="Do you have a website?"
            fullWidth
          />

          <FormInputText
            name="phone"
            label="Phone number"
            helper="This number will be display on your business page"
            fullWidth
          />

          <FormCategory></FormCategory>

          <FormInputText
            name="description"
            label="A short description of your business (max 250 words)"
            multiline
            inputProps={{ maxLength: 250 }}
            rows={5}
            fullWidth
          />

          <FormInputUpload
            maxFiles={1}
            firestoreUrl={`businesses/${user?.businessId}`}
            name="logo"
            async={false}
            label="Logo de votre business"
            DropzoneProps={{ maxFiles: 1, accept: "image/jpeg, image/png" }}
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

          <FormSubmitButton fullWidth>create my business page</FormSubmitButton>
        </Form>
      </WelcomeLayout>
    </Page>
  );
};

const Onboarding = () => (
  <UserAuthGranted role="business">
    <OnboardingComponent />
  </UserAuthGranted>
);

export default Onboarding;
