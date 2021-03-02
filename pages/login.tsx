import React, { Fragment, useContext, useState } from "react";
import * as Yup from "yup";

import Page from "@components/Page";
import WelcomeLayout from "@components/WelcomeLayout";
import PageTitle from "@components/PageTitle";
import { Box } from "@material-ui/core";
import RoleSelector from "widgets/login/RoleSelector";
import ButtonSocial from "@components/ButtonSocial";
import Divider from "@components/Divider";
import Subtitle from "@components/Subtitle";
import auth from "@models/auth";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import AuthContext from "@auth/AuthContext";
import toast from "react-hot-toast";

const loginCredentialsSchema = Yup.object().shape({
  email: Yup.string().defined().email().label("Email").default(""),
});

// type LoginCredentialsValues = Yup.InferType<typeof loginCredentialsSchema>;

const Login: React.FC = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSocialLogin, setIsSocialLogin] = useState<
    "facebook" | "google" | null
  >(null);

  /**
   *
   * @param values
   * @param formikHelpers
   */

  //TODO: If someone need to login with his email
  // const loginWithEmail = (
  //   values: LoginCredentialsValues,
  //   formikHelpers: FormikHelpers<LoginCredentialsValues>
  // ) => {
  //   console.log(values, formikHelpers);
  // };

  /**
   *
   * @param providerName
   */
  const loginWithSocial = async (providerName: "facebook" | "google") => {
    setIsSocialLogin(providerName);

    try {
      const user = await auth.loginWithSocial(providerName, {
        role: userRole,
        locale: router.locale as string,
      });

      toast.success("Successfully login!");
      setUser(user);

      // if user is not onboarded, he has to go to onboarding page and do the process
      if (user.onboarded === false) {
        console.log("ONBOARDING REDIRECTION !");
        router.push("/onboarding");
        return;
      }

      // if user wants to visit a business
      if (router.query?.redirectBusiness) {
        router.push(`/business/${router.query?.redirectBusiness}`);
        return;
      }

      return router.push("/");
    } catch (error) {
      setError(error.message);
      setIsSocialLogin(null);
    }
  };

  return (
    <Page
      title="Login"
      description="We unite Phangan's people to create a better future for all of us"
    >
      <WelcomeLayout fluidLeft={false} HeaderProps={{ showLoginButton: false }}>
        <PageTitle
          title="Be part of our awesome community"
          subtitle="We unite Phangan's people to create a better future for all
          of us"
        />

        <RoleSelector
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
                    loader={isSocialLogin === "facebook"}
                    social="facebook"
                    onClick={() => loginWithSocial("facebook")}
                  />
                </Box>
                <Box flex="50%">
                  <ButtonSocial
                    fullWidth
                    loader={isSocialLogin === "google"}
                    social="google"
                    onClick={() => loginWithSocial("google")}
                  />
                </Box>
              </Box>
            </Box>

            {/* <Subtitle strong gutterBottom>
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
            </Form> */}
          </Fragment>
        )}
      </WelcomeLayout>
    </Page>
  );
};

export default Login;
