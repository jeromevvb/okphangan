import React, { Fragment } from "react";
import Head from "next/head";

export interface PageProps {
  title: string;
  description?: string;
  keywords?: string;
  children?: any;
}

const Page: React.FC<PageProps> = (props) => {
  const { children, description, keywords, title } = props;

  return (
    <Fragment>
      <Head>
        <title>OK PHANGAN - {title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </Fragment>
  );
};

export default Page;
