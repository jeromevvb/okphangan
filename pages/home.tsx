import React from "react";
import { useRouter } from "next/router";
import useAuth from "@auth/useAuth";
import WelcomeLayout from "@components/WelcomeLayout";
import Page from "@components/Page";
import Title from "@components/Title";
import { Box, makeStyles } from "@material-ui/core";
import SearchBar from "@components/SearchBar/SearchBar";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = (search: string) => {
    return router.push(`/search?str=${encodeURIComponent(search)}`);
  };

  return (
    <Page
      title="Be part of our community"
      description="We unite Phangan's people in order to create a better future for all of us"
    >
      <WelcomeLayout>
        <Box textAlign="center" margin="auto" paddingTop={8} maxWidth={"80%"}>
          <Box marginBottom={2}>
            <Title variant={"h3"}>
              Explore the <span className={classes.colorPrimary}>paradise</span>
            </Title>
          </Box>
          <SearchBar onChange={handleSearch}></SearchBar>
        </Box>
      </WelcomeLayout>
    </Page>
  );
};

export default Home;
