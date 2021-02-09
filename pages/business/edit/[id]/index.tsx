import React, { useState } from "react";
import Page from "@components/Page";
import { BusinessModel } from "@models/business";
import Navbar from "@components/Navbar";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import useAuth from "@auth/useAuth";
import UserAuthGranted from "@auth/UserAuthGranted";
import { useRouter } from "next/router";
import BusinessHeader from "@components/BusinessHeader";
import { useDocument } from "@nandorojo/swr-firestore";
import EditBusinessProfile from "./profile";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  tabs: {
    borderBottom: "1px solid #e0e0e0",
  },
  tabSelected: {
    fontWeight: 900,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box marginTop={3}>{children}</Box>}
    </div>
  );
}

const EditBusiness = () => {
  const { user } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const [tab, setTab] = useState<number>(0);
  const id = router.query.id;
  const { data: business, loading, error } = useDocument<BusinessModel>(
    `businesses/${id}`
  );

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const isOwner = business?.userId !== user?.businessId;

  if (!isOwner || !business) {
    router.replace("/");
    return "";
  }

  return (
    <UserAuthGranted role="business">
      <Page title={business.name}>
        <Navbar />
        <Container>
          <Box
            display="flex"
            marginBottom={4}
            alignContent="center"
            alignItems="center"
            marginTop={4}
          >
            <BusinessHeader business={business} />
          </Box>
          <Box>
            <Tabs
              className={classes.tabs}
              value={tab}
              indicatorColor="primary"
              onChange={handleChangeTab}
            >
              <Tab
                label="Profile"
                classes={{ selected: classes.tabSelected }}
              />
              <Tab label="Blog" classes={{ selected: classes.tabSelected }} />
              <Tab
                label="Hot deals"
                classes={{ selected: classes.tabSelected }}
              />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <EditBusinessProfile business={business} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={tab} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </Container>
      </Page>
    </UserAuthGranted>
  );
};

export default EditBusiness;

// export const getStaticProps: GetStaticProps = async () => {
//   const request = await fuego.db
//     .collection("places")
//     .where("userId", "==", "Rl7oatemA9XISnVZ8MvKOxvwSAx1")
//     .get();

//   const result = request.docs.map((doc) => {
//     return {
//       ...doc.data(),
//       createdAt: doc.data().createdAt.toDate().toString(),
//     };
//   });

//   return {
//     props: {
//       place: result[0],
//     },
//   };
// };