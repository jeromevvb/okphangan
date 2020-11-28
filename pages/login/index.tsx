import React, { Fragment } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import firebase from "@services/firebase";
import facebookProvider from "@auth/providers/facebook";
import googleProvider from "@auth/providers/google";
import Button from "@components/Button";

import Form from "@components/Form";
import FormInputText from "@components/FormInputText";
import FormSubmitButton from "@components/FormSubmitButton";
import Page from "@components/Page";

/**
 * API RESPONSE SOCIAL
 *  
 * additionalUserInfo:
 *  isNewUser: true
    profile:
      email: "jeromevvb@gmail.com"
      first_name: "Jérôme"
      granted_scopes: (2) ["email", "public_profile"]
      id: "10158719289887302"
      last_name: "Van Vlierbergen"
      name: "Jérôme Van Vlierbergen"
      picture: {data: {…}}
    providerId:'google' 
    credential: Lg
      accessToken: "EAALoX4Ws77ABAIWb43dsA6iut1quBr482WAXEriuDAUwTWAognLYD3IgAoz1VCceM934EdM04zLv6eZCN8rd6XnFkKIHD5rWxWUy69wb1WzcxlkXdVuOZCCRZBP7JZBkRGRVOjKinFPZCpIF6rrRKCMnAu0p9XbIZD"
      providerId: "facebook.com"
      signInMethod: "facebook.com"
 */

const loginCredentialsSchema = Yup.object().shape({
  email: Yup.string().defined().email().label("Email").default(""),
});

type LoginCredentialsValues = Yup.InferType<typeof loginCredentialsSchema>;

const Login: React.FC = () => {
  const initialValues: LoginCredentialsValues = loginCredentialsSchema.default();

  console.log(loginCredentialsSchema, initialValues);

  /**
   *
   * @param values
   * @param formikHelpers
   */

  const loginWithEmail = (
    values: LoginCredentialsValues,
    formikHelpers: FormikHelpers<LoginCredentialsValues>
  ) => {
    console.log(values, formikHelpers);
  };

  /**
   *
   * @param providerName
   */
  const loginWithSocial = (providerName: string) => {
    const provider =
      providerName === "facebook" ? facebookProvider : googleProvider;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        console.log(result);
        // var token = result.credential;
        // // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function (error) {
        //TODO: Catch error, display user error.
        console.log(error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <Page title="Be part of the community">
      <Button
        onClick={() => loginWithSocial("facebook")}
        variant="contained"
        color="primary"
      >
        Login with facebook
      </Button>

      <Button
        onClick={() => loginWithSocial("google")}
        variant="contained"
        color="secondary"
      >
        Login with google
      </Button>

      {/* <Form
        validationSchema={loginCredentialsSchema}
        initialValues={initialValues}
        onSubmit={loginWithEmail}
      >
        <FormInputText name="email" label="Your email address" />
        <FormSubmitButton>Connexion</FormSubmitButton>
      </Form> */}
    </Page>
  );
};

export default Login;
