import { useEffect, useState } from "react";
import nookies from "nookies";
import AuthContext from "./AuthContext";
import firebase from "../services/firebase";
import { getUser, UserModel } from "@models/user";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const classes = useStyles();

  /**
   * Callback function used for firebase.auth.onIdTokenChanged().
   * Takes the user object returned and formats it for my state.
   * We fetch the idToken and append it to my auth state and store it.
   */
  const onIdTokenChanged = async (firebaseUser: firebase.User | null) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      const requestUser = await getUser(firebaseUser.uid);
      if (requestUser) {
        setUser(requestUser);
      }
      //set cookie token
      nookies.set(null, "token", token, {});
    } else {
      setUser(null);
      nookies.set(null, "token", "", {});
    }

    setUserLoading(false);
  };
  /**
   * Callback for when firebase signOut.
   * Sets auth state to null and loading to true.
   */
  const clear = () => {
    setUser(null);
    setUserLoading(false);
    toast.success("Successfully logout");
  };

  /**
   * Calls firebase signOut and with clear callback to reset state.
   */
  const signOut = () => {
    setUserLoading(true);
    return firebase.auth().signOut().then(clear);
  };

  /**
   * Watches for state change for firebase auth and calls the handleUser callback
   * on every change.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(onIdTokenChanged);
    return () => unsubscribe();
  }, []);

  if (userLoading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
