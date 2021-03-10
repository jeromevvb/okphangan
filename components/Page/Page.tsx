import React, { Fragment } from "react";
import Head from "next/head";

export interface PageProps {
  title: string;
  description?: string;

  children?: any;
  robots?: string;
}

const Page: React.FC<PageProps> = (props) => {
  const { children, description, title, robots = "index, follow" } = props;

  return (
    <Fragment>
      <Head>
        <title>{title} - OKPhangan</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        {description && <meta name="description" content={description} />}
        <meta charSet="UTF-8" />
        <meta name="robots" content={robots} />
      </Head>
      {children}
    </Fragment>
  );
};

export default Page;
