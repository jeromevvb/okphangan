import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Page from "@components/Page";
import { Box, Container, Grid, LinearProgress } from "@material-ui/core";
import SearchBar from "@components/SearchBar/SearchBar";
import Navbar from "@components/Navbar";
import { BusinessModel, searchBusiness } from "@models/business";
import Card from "@components/Card";
import BodyText from "@components/BodyText";
import BusinessCard from "@components/BusinessCard";
import Subtitle from "@components/Subtitle";

const Home = () => {
  const router = useRouter();
  const [searching, setSearching] = useState<boolean>(false);
  const [results, setResults] = useState<BusinessModel[]>([]);
  const query = router.query?.str as string;

  useEffect(() => {
    // fetch request

    const doRequest = async () => {
      if (!query) return;

      setSearching(true);
      const response = await searchBusiness(query.toLowerCase());
      setResults(response);
      setSearching(false);
    };

    doRequest();
  }, [query]);

  const handleSearch = (search: string) => {
    if (!search) {
      return router.push("/search", undefined, {
        shallow: true,
      });
    }

    router.push(`/search?str=${encodeURIComponent(search)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <Page
      title={`Find the best in our community`}
      description="We unite Phangan's people in order to create a better future for all of us"
    >
      <Navbar />
      <Container maxWidth={"md"}>
        <Box marginTop={4}>
          <SearchBar defaultSearch={query} onChange={handleSearch} />
          {searching && <LinearProgress />}
        </Box>
        <Box marginTop={4}>
          {results.length > 0 && (
            <Fragment>
              <Box marginTop={2}>
                <Grid container spacing={2}>
                  {results.map((business) => (
                    <Grid key={business.id} item xs={12} sm={6} md={4}>
                      <BusinessCard business={business} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fragment>
          )}
          {results.length === 0 && query && (
            <Box marginTop={4} textAlign="center">
              <Subtitle>We haven't found what you're looking for =(</Subtitle>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default Home;
