import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Image from "next/image";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import { MdMenu } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { Box, Container, Link } from "@material-ui/core";
import UserMenu from "widgets/navbar/UserMenu";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    menuButton: {
      // marginRight: theme.spacing(1),
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    appBarRoot: {
      minHeight: 70,
      [theme.breakpoints.down("xs")]: {
        minHeight: 60,
      },
    },
    title: {
      flexGrow: 1,
      marginTop: 12,
      marginRight: theme.spacing(1),
    },
    user: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // [theme.breakpoints.down("xs")]: {
      //   display: "none",
      // },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        display: "block",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "25ch",
        },
      },
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleClickSearch = () => {
    router.push("/search");
  };

  const handleClickLogo = () => {
    router.push("/");
  };

  return (
    <AppBar position="static" classes={{ root: classes.appBarRoot }}>
      <Toolbar disableGutters>
        <Container>
          <div className={classes.root}>
            <div className={classes.title}>
              <Box onClick={handleClickLogo}>
                <Image
                  src="/images/logo-white.png"
                  alt="Logo OKPhangan"
                  width={200}
                  height={50}
                />
              </Box>
            </div>
            <div>
              <IconButton color="inherit" onClick={handleClickSearch}>
                <MdSearch />
              </IconButton>
            </div>
            {/* <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <MdSearch />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div> */}
            <div className={classes.user}>
              <UserMenu />
            </div>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
