import React, { Fragment, useEffect } from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import AuthProvider from "@auth/AuthProvider";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import { firebaseConfig, Fuego } from "@services/firebase";
import theme from "../theme";

import "firebase/firestore";
import "firebase/auth";
import "../styles/globals.css";

const fuego = new Fuego(firebaseConfig);

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <FuegoProvider fuego={fuego}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </FuegoProvider>
    </Fragment>
  );
};

export default MyApp;
