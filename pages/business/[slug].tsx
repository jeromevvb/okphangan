import React, { Fragment } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import firebase from "@services/firebase";
import Page from "@components/Page";
import { BusinessModel } from "@models/business";
import Navbar from "@components/Navbar";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import Subtitle from "@components/Subtitle";
import Button from "@components/Button";
import { FaEdit, FaRegHeart } from "react-icons/fa";
import useAuth from "@auth/useAuth";
import BusinessHeader from "@components/BusinessHeader";
import Geolocation from "widgets/business/Geolocation";
import PhotosLightbox from "widgets/business/PhotosLightbox";
import Card from "@components/Card";
import ContactCard from "widgets/business/ContactCard";

export interface PlaceProps {
  business: BusinessModel;
  businessId: string;
}

type Params = {
  params: {
    slug: string;
  };
};

const Business: React.FC<PlaceProps> = (props) => {
  const { business } = props;
  const { user } = useAuth();

  const photos: Array<string> =
    business.photos instanceof Array
      ? business.photos.map((photoUrl) => photoUrl)
      : [];

  const isOwner = business.id === user?.business?.id;

  return (
    <Page title={business.name} description={business.description}>
      <Navbar />
      <Container>
        <Box marginBottom={4} marginTop={4}>
          <BusinessHeader
            business={business}
            rightAction={
              <Fragment>
                {isOwner && (
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    href={`/business/edit/${business.id}`}
                    startIcon={<FaEdit />}
                  >
                    Edit my page
                  </Button>
                )}
                {!isOwner && (
                  <Tooltip
                    title="Get notified when this page has some nice deals for you"
                    arrow
                  >
                    <div>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        startIcon={<FaRegHeart />}
                      >
                        FOLLOW
                      </Button>
                    </div>
                  </Tooltip>
                )}
              </Fragment>
            }
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} md={8}>
            <PhotosLightbox photos={photos}></PhotosLightbox>
            {business.description && (
              <Box marginTop={4}>
                <Card title="Description">
                  <Subtitle>{business.description}</Subtitle>
                </Card>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <Box marginBottom={2}>
              <ContactCard business={business} />
            </Box>

            <Geolocation
              hasGeocoding={business.hasGeocoding}
              geocoding={business.geocoding}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Business;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;

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
      updateAt: doc.data().updateAt.toDate().toString(),
    };
  });

  if (result.length === 0) {
    return {
      notFound: true,
    };
  }

  const business = { ...result[0], id: result[0].id };

  return {
    props: { business }, // will be passed to the page component as props
  };
}
