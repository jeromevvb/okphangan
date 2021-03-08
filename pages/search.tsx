import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Page from "@components/Page";
import {
  Avatar,
  Box,
  capitalize,
  Chip,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import SearchBar from "@components/SearchBar/SearchBar";
import Navbar from "@components/Navbar";
import { BusinessModel, searchBusiness } from "@models/business";
import Card from "@components/Card";
import BusinessAvatar from "@components/BusinessAvatar";
import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import BodyText from "@components/BodyText";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  cardRoot: {
    "&:hover": {
      // border: `1px solid ${theme.palette.primary.main}`,
      cursor: "pointer",
      boxShadow: "0px 1px 5px #d7d7d7",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const [results, setResults] = useState<BusinessModel[]>([]);
  const query = router.query?.str as string;

  useEffect(() => {
    // fetch request

    const doRequest = async () => {
      if (!query) return;

      const response = await searchBusiness(query.toLowerCase());
      setResults(response);
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
        </Box>
        <Box marginTop={4}>
          {results.length > 0 && (
            <Fragment>
              <Box marginTop={2}>
                <Grid container spacing={2}>
                  {results.map((business) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <BusinessCard business={business} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fragment>
          )}
          {results.length === 0 && (
            <Box marginTop={4} textAlign="center">
              <Subtitle>We haven't found what you're looking for =(</Subtitle>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
};

const BusinessCard: React.FC<{ business: BusinessModel }> = ({ business }) => {
  const router = useRouter();
  const classes = useStyles();

  const handleClick = () => {
    return router.push(`/business/${business.slug}`);
  };

  return (
    <Card onClick={handleClick} className={classes.cardRoot}>
      <Box textAlign="center" marginTop={1}>
        <BusinessAvatar business={business} />

        <Subtitle strong>{business.name.toUpperCase()}</Subtitle>
        <BodyText>
          {capitalize(business.type)} - {capitalize(business.category)}
        </BodyText>
      </Box>
      <Box marginTop={2}>
        {business.tags instanceof Array &&
          business.tags.map((tag: string) => (
            <Box key={tag} margin={0.2} display="inline-flex">
              <Chip label={tag.toUpperCase()} size="small" />
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default Home;
