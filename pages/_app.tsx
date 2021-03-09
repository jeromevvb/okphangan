import React, { Fragment, useEffect } from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import AuthProvider from "@auth/AuthProvider";
import theme from "../theme";
import { Toaster } from "react-hot-toast";

import NextNprogress from "nextjs-progressbar";

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
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <AuthProvider>
          <NextNprogress
            color={theme.palette.secondary.main}
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </Fragment>
  );
};

export default MyApp;
