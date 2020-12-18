import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fuego from "@services/fuego";
import Page from "@components/Page";
import { PlaceModel } from "@models/places";

export interface PlaceProps {
  place: PlaceModel;
}

type Params = {
  params: {
    slug: string;
  };
};

const Place: React.FC<PlaceProps> = (props) => {
  const { place } = props;

  return (
    <Page title={place.name} description={place.description}>
      hello Place
    </Page>
  );
};

export default Place;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const request = await fuego.db.collection("places").get();

  // // Get the paths we want to pre-render based on posts
  const paths = request.docs.map((doc) => `/places/${doc.data().slug}`);

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { slug } = params;
  const request = await fuego.db
    .collection("places")
    .where("slug", "==", slug)
    .get();

  const result = request.docs.map((doc) => {
    console.log(doc.data());

    return {
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toString(),
    };
  });

  return {
    props: {
      place: result[0],
    },
  };
};
