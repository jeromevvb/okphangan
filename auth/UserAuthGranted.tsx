import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

interface UserAuthGrantedProps {
  children: any;
  role?: "business" | "member";
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const UserAuthGranted: React.FC<UserAuthGrantedProps> = ({
  role,
  children,
}) => {
  const { user, userLoading } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    // if user is still null, means that there is not user authenticated
    // we redirect.
    if (!user && !userLoading) {
      router.replace("/");
    }

    // if user but his role is not granted
    // we redirect.
    if (user && role && user.role !== role) {
      router.replace("/");
    }
  }, [user, userLoading]);

  // if user is fetching...
  if (userLoading || !user)
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return children;
};

export default UserAuthGranted;
