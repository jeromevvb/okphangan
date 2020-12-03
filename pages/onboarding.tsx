import React from "react";
import UserAuthGranted from "@auth/UserAuthGranted";
import Page from "@components/Page";
import WelcomeContainer from "@components/WelcomeContainer";
import { Box } from "@material-ui/core";
import PageTitle from "@components/PageTitle";
import Form from "@components/Form";
import {
  BusinessCreationValues,
  businessCreationSchema,
} from "@models/business";
import { FormikHelpers } from "formik";
import FormInputText from "@components/FormInputText";
import FormInputUpload from "@components/FormInputUpload";

interface OnboardingProps {
  test?: string;
}

const Onboarding: React.FC<OnboardingProps> = ({}) => {
  const initialValues = businessCreationSchema.default();

  const handleSubmit = (
    values: BusinessCreationValues,
    formikHelpers: FormikHelpers<BusinessCreationValues>
  ) => {};

  return (
    <UserAuthGranted role="business">
      <Page title="Create your business page">
        <WelcomeContainer HeaderProps={{ showLoginButton: false }}>
          <Box maxWidth="600px">
            <PageTitle
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
                label="Public Phone number"
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

              <FormInputUpload
                name="logo"
                label="Logo de votre business"
                DropzoneProps={{ maxFiles: 1, accept: "image/jpeg, image/png" }}
              />
            </Form>
          </Box>
        </WelcomeContainer>
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
