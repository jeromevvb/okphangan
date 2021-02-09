import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fuego from "@services/fuego";
import Page from "@components/Page";
import { BusinessModel } from "@models/business";
import Navbar from "@components/Navbar";
import { Box, Container, Grid, makeStyles, Theme } from "@material-ui/core";
import Card from "@components/Card/Card";
import Geolocation from "widgets/place/Geolocation";
import Subtitle from "@components/Subtitle";
import Button from "@components/Button";
import { FaEdit, FaRegHeart } from "react-icons/fa";
import useAuth from "@auth/useAuth";
import BusinessHeader from "@components/BusinessHeader";

export interface PlaceProps {
  place: BusinessModel;
  placeId: string;
}

type Params = {
  params: {
    slug: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({}));

const Place: React.FC<PlaceProps> = (props) => {
  const { place, placeId } = props;
  const { user } = useAuth();
  const classes = useStyles();

  const isOwner = placeId === user?.businessId;

  return (
    <Page title={place.name} description={place.description}>
      <Navbar></Navbar>
      <Container>
        <Box
          display="flex"
          marginBottom={4}
          alignContent="center"
          alignItems="center"
          marginTop={4}
        >
          <BusinessHeader business={place} />
          <Box flex="1" />
          <Box>
            {isOwner && (
              <Button
                variant="contained"
                color="primary"
                href={`/business/edit/${placeId}`}
                startIcon={<FaEdit />}
              >
                Edit my page
              </Button>
            )}
            {!isOwner && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FaRegHeart />}
              >
                FOLLOW
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card title="Pictures" />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box marginBottom={4}>
              <Subtitle>{place.description}</Subtitle>
            </Box>
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
  const request = await fuego.db.collection("businesses").get();

  // // Get the paths we want to pre-render based on posts
  const paths = request.docs.map((doc) => `/business/${doc.data().slug}`);

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { slug } = params;
  const request = await fuego.db
    .collection("businesses")
    .where("slug", "==", slug)
    .get();

  const result = request.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toString(),
    };
  });

  return {
    props: {
      place: result[0],
      placeId: result[0].id,
    },
  };
};
