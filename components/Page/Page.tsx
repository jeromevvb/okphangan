import React, { Fragment } from "react";
import Head from "next/head";

interface PageProps {
  title: string;
  children: any;
}

const Page: React.FC<PageProps> = (props) => {
  const { children, title } = props;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </Fragment>
  );
};

Page.defaultProps = {
  title: "OK Phangan",
};

export default Page;
