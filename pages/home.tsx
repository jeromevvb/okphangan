import React from "react";
import { useRouter } from "next/router";
import useAuth from "@auth/useAuth";
import WelcomeLayout from "@components/WelcomeLayout";
import Page from "@components/Page";
import Title from "@components/Title";
import { Box, makeStyles } from "@material-ui/core";
import SearchBar from "@components/SearchBar/SearchBar";
import Subtitle from "@components/Subtitle";
import RecentlyJoined from "widgets/home/RecentlyJoined";

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
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
        <Box
          textAlign="center"
          margin="auto"
          paddingTop={8}
          paddingBottom={8}
          className={classes.container}
        >
          <Box marginBottom={2}>
            <Title variant={"h3"}>
              Explore the <span className={classes.colorPrimary}>paradise</span>
            </Title>
          </Box>
          <SearchBar onChange={handleSearch} />
        </Box>
        <Box>
          <Title>Recently joined</Title>
          <Box marginTop={4}>
            <RecentlyJoined />
          </Box>
        </Box>
      </WelcomeLayout>
    </Page>
  );
};

export default Home;
