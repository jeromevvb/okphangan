import React, { Fragment, useState } from "react";
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
import useDocument from "@hooks/useDocument";
import useAuth from "@auth/useAuth";
import UserAuthGranted from "@auth/UserAuthGranted";
import { useRouter } from "next/router";
import BusinessHeader from "@components/BusinessHeader";
import EditBusinessProfile from "./profile";
import EditBusinessPhotos from "./photos";
import { VscPreview } from "react-icons/vsc";
import Button from "@components/Button";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";

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
  const router = useRouter();
  const { user } = useAuth();
  const classes = useStyles();

  const id = router.query.id as string;
  const defaultTab = router.query.tab ? parseInt(router.query.tab) : 0;

  const [tab, setTab] = useState<number>(defaultTab);

  const { loading, data: business, error } = useDocument<BusinessModel>(
    `businesses/${id}`
  );

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    router.push(`/business/edit/${id}?tab=${newValue}`, undefined, {
      shallow: true,
    });

    setTab(newValue);
  };

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  //TODO: Create 404 page.
  if (!business || user?.business?.id !== id) {
    return "";
  }

  return (
    <UserAuthGranted role="business">
      <Page title={business.name}>
        <Navbar />
        <Container>
          <Box marginBottom={4} marginTop={4}>
            <BusinessHeader
              business={business}
              rightAction={
                <Fragment>
                  <Button
                    fullWidth
                    href={`/business/${business.slug}`}
                    variant="contained"
                    color="primary"
                    startIcon={<VscPreview />}
                  >
                    Go to my page
                  </Button>
                </Fragment>
              }
            />
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
              <Tab
                label="Logo & Photos"
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
              <EditBusinessPhotos business={business} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Alert severity="info">
                <AlertTitle>
                  Blog - <strong>available soon!</strong>
                </AlertTitle>
                Post content on our platform and share automatically to your
                social networks.
              </Alert>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Alert severity="info">
                <AlertTitle>
                  Hot deals - <strong>available soon!</strong>
                </AlertTitle>
                Share your current hot deals (promotions) and send automatically
                to the community.
              </Alert>
            </TabPanel>
          </Box>
        </Container>
      </Page>
    </UserAuthGranted>
  );
};

export default EditBusiness;
