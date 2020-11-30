import React, { Fragment } from "react";
import Head from "next/head";

export interface PageProps {
  title: string;
  description?: string;
  keywords?: Array<string>;
  children?: any;
}

const Page: React.FC<PageProps> = (props) => {
  const { children, description, keywords, title } = props;

  return (
    <Fragment>
      <Head>
        <title>OK PHANGAN - {title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords.join(",")} />}
      </Head>
      {children}
    </Fragment>
  );
};

export default Page;
