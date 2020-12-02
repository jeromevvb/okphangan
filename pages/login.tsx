import React, { Fragment, useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";

import Page from "@components/Page";
import WelcomeContainer from "@components/WelcomeContainer";
import PageTitle from "@components/PageTitle";
import { Box } from "@material-ui/core";
import LoginRoleSelector from "widgets/LoginRoleSelector";
import ButtonSocial from "@components/ButtonSocial";
import Divider from "@components/Divider";
import Form from "@components/Form";
import FormInputText from "@components/FormInputText";
import FormSubmitButton from "@components/FormSubmitButton";
import Subtitle from "@components/Subtitle";
import auth from "@models/auth";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";

const loginCredentialsSchema = Yup.object().shape({
  email: Yup.string().defined().email().label("Email").default(""),
});

type LoginCredentialsValues = Yup.InferType<typeof loginCredentialsSchema>;

const Login: React.FC = () => {
  const { locale } = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const initialValues: LoginCredentialsValues = loginCredentialsSchema.default();

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
  const loginWithSocial = async (providerName: "facebook" | "google") => {
    try {
      const response = await auth.loginWithSocial(providerName, {
        role: userRole,
        locale: locale as string,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Page
      title="Login"
      description="We unite Phangan's people to create a better future for all of us"
    >
      <WelcomeContainer HeaderProps={{ showLoginButton: false }}>
        <Box maxWidth="600px">
          <PageTitle
            title="Be part of our awesome community"
            subtitle="We unite Phangan's people to create a better future for all
          of us"
          />

          <LoginRoleSelector
            role={userRole}
            onChangeRole={(role: string) => setUserRole(role)}
          />

          {userRole && (
            <Fragment>
              <Divider spacing={4} />

              {error && (
                <Box marginBottom={2}>
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                </Box>
              )}

              <Box marginBottom={4}>
                <Subtitle strong gutterBottom>
                  Login with your socials networks
                </Subtitle>

                <Box display="flex">
                  <Box flex="50%" marginRight={2}>
                    <ButtonSocial
                      fullWidth
                      social="facebook"
                      onClick={() => loginWithSocial("facebook")}
                    />
                  </Box>
                  <Box flex="50%">
                    <ButtonSocial
                      fullWidth
                      social="google"
                      onClick={() => loginWithSocial("google")}
                    />
                  </Box>
                </Box>
              </Box>

              <Subtitle strong gutterBottom>
                Login with your email
              </Subtitle>

              <Form
                validationSchema={loginCredentialsSchema}
                initialValues={initialValues}
                onSubmit={loginWithEmail}
              >
                <FormInputText
                  helper="We will send you a magic link, we don't need to use password"
                  fullWidth
                  name="email"
                  label="Your email address"
                />

                <FormSubmitButton fullWidth>Connexion</FormSubmitButton>
              </Form>
            </Fragment>
          )}
        </Box>
      </WelcomeContainer>
    </Page>
  );
};

export default Login;
