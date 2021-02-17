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

interface OnboardingProps {}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  const initialValues = businessCreationSchema.default();
  const router = useRouter();
  const { user } = useAuth();

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
    <UserAuthGranted role="business">
      <Page title="Create your business page">
        <WelcomeLayout
          fluidLeft={false}
          HeaderProps={{ showLoginButton: false }}
        >
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
            <FormInputText
              name="name"
              label="Name of your business"
              fullWidth
            />

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
              storageUrl={`businesses/${business.id}/logo`}
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

            <FormSubmitButton fullWidth>
              create my business page
            </FormSubmitButton>
          </Form>
        </WelcomeLayout>
      </Page>
    </UserAuthGranted>
  );
};

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   try {
//     const cookies = nookies.get(ctx);
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

//     // the user is authenticated!
//     const { uid, email } = token;

//     console.log(uid, email);
//     const db = firebaseAdmin.firestore().collection("users").doc(uid);
//     const user = await db.get();

//     console.log(user.data());

//     return {
//       props: { message: `Your email is ${email} and your UID is ${uid}.` },
//     };
//   } catch (err) {
//     console.log(err);

//     // either the `token` cookie didn't exist
//     // or token verification failed
//     // either way: redirect to the login page
//     ctx.res.writeHead(302, { Location: "/" });
//     ctx.res.end();

//     // `as never` prevents inference issues
//     // with InferGetServerSidePropsType.
//     // The props returned here don't matter because we've
//     // already redirected the user.
//     return { props: {} as never };
//   }
// };

export default Onboarding;
