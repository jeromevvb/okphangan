import { useEffect, useState } from "react";
import nookies from "nookies";
import AuthContext from "./AuthContext";
import firebase from "../services/firebase";
import { UserModel } from "@models/auth";

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  /**
   * Callback function used for firebase.auth.onIdTokenChanged().
   * Takes the user object returned and formats it for my state.
   * We fetch the idToken and append it to my auth state and store it.
   */
  const onIdTokenChanged = async (firebaseUser: firebase.User | null) => {
    if (!firebaseUser) {
      setUserLoading(false);
      setUser(null);
      return nookies.set(null, "token", "", {});
    }

    const token = await firebaseUser.getIdToken();
    const db = firebase.firestore().collection("users").doc(firebaseUser.uid);
    const userData = await db.get();

    setUser(userData.data() as UserModel);
    //set cookie token
    nookies.set(null, "token", token, {});

    setUserLoading(false);
  };
  /**
   * Callback for when firebase signOut.
   * Sets auth state to null and loading to true.
   */
  const clear = () => {
    setUser(null);
    setUserLoading(false);
  };

  /**
   * Calls firebase signOut and with clear callback to reset state.
   */
  const signOut = () => {
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

  return (
    <AuthContext.Provider value={{ user, userLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
