import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fuego from "@services/fuego";
import Page from "@components/Page";
import { PlaceModel } from "@models/places";
import Navbar from "@components/Navbar";
import {
  Avatar,
  Box,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Card from "@components/Card/Card";
import Image from "next/image";
import Geolocation from "widgets/place/Geolocation";
import Subtitle from "@components/Subtitle";
import Title from "@components/Title";

export interface PlaceProps {
  place: PlaceModel;
}

type Params = {
  params: {
    slug: string;
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 125,
      height: 125,
      borderRadius: "100%",
      textTransform: "uppercase",
      margin: "auto",
    },
  })
);

const Place: React.FC<PlaceProps> = (props) => {
  const { place } = props;
  const classes = useStyles();
  console.log(place);

  return (
    <Page title={place.name} description={place.description}>
      <Navbar></Navbar>
      <Container>
        {/* <Title>{place.name}</Title> */}

        <Box
          display={"flex"}
          justifyContent={"center"}
          marginBottom={4}
          marginTop={4}
        >
          <Box textAlign="center" margin="auto">
            <Box marginBottom={1}>
              {place.logoUrl && (
                <Image
                  className={classes.logo}
                  src={place.logoUrl}
                  alt={`Logo from ${place.name}`}
                  width={125}
                  height={125}
                />
              )}
              {!place.logoUrl && (
                <Avatar classes={{ root: classes.logo }}>
                  {place.name.substring(0, 2)}
                </Avatar>
              )}
            </Box>
            <Box>
              <Title>{place.name}</Title>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <Box marginBottom={4}>
              <Subtitle>{place.description}</Subtitle>
            </Box>

            <Card title="Pictures" />
          </Grid>
          {place.hasGeocoding && (
            <Grid item xs={12} sm={6} md={4}>
              <Geolocation geocoding={place.geocoding}></Geolocation>
            </Grid>
          )}
        </Grid>
      </Container>
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
