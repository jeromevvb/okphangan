import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import firebase from "@services/firebase";
import Page from "@components/Page";
import { BusinessModel } from "@models/business";
import Navbar from "@components/Navbar";
import { Box, Container, Grid, makeStyles, Theme } from "@material-ui/core";
import Subtitle from "@components/Subtitle";
import Button from "@components/Button";
import { FaEdit, FaRegHeart } from "react-icons/fa";
import useAuth from "@auth/useAuth";
import BusinessHeader from "@components/BusinessHeader";
import Geolocation from "widgets/business/Geolocation";

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import { Gallery, Item } from "react-photoswipe-gallery";

export interface PlaceProps {
  business: BusinessModel;
  businessId: string;
}

type Params = {
  params: {
    slug: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({}));

const Business: React.FC<PlaceProps> = (props) => {
  const { business, businessId } = props;
  const { user } = useAuth();
  const classes = useStyles();

  const isOwner = businessId === user?.businessId;

  return (
    <Page title={business.name} description={business.description}>
      <Navbar></Navbar>
      <Container>
        <Box
          display="flex"
          marginBottom={4}
          alignContent="center"
          alignItems="center"
          marginTop={4}
        >
          <BusinessHeader business={business} />
          <Box flex="1" />
          <Box>
            {isOwner && (
              <Button
                variant="contained"
                color="primary"
                href={`/business/edit/${businessId}`}
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
            <Gallery>
              {business.photos?.map((photoUrl) => {
                return (
                  <Item original={photoUrl} thumbnail={photoUrl}>
                    {({ ref, open }) => (
                      <div
                        style={{
                          width: "250px",
                          maxHeight: "200",
                          margin: "0px 5px",
                          display: "inline-block",
                        }}
                      >
                        <img
                          width={250}
                          height={200}
                          ref={ref as React.MutableRefObject<HTMLImageElement>}
                          style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            width: "100%",
                            maxHeight: "100%",
                          }}
                          onClick={open}
                          src={photoUrl}
                        />
                      </div>
                    )}
                  </Item>
                );
              })}
            </Gallery>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box marginBottom={4}>
              <Subtitle>{business.description}</Subtitle>
            </Box>
          </Grid>
          {business.hasGeocoding && (
            <Grid item xs={12} sm={6} md={4}>
              <Geolocation geocoding={business.geocoding}></Geolocation>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Business;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const request = await firebase.firestore().collection("businesses").get();

  // // Get the paths we want to pre-render based on posts
  const paths = request.docs.map((doc) => `/business/${doc.data().slug}`);

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { slug } = params;
  const request = await firebase
    .firestore()
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
      business: result[0],
      // businessId: result[0].id,
    },
  };
};
