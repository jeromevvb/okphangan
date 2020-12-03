import { useEffect, useState } from "react";
import nookies from "nookies";
import AuthContext from "./AuthContext";
import firebase from "firebase/app";
import { UserModel } from "@models/auth";

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(null, "token", "", {});
      } else {
        const token = await user.getIdToken();
        // get user info
        const db = firebase.firestore().collection("users").doc(user.uid);
        const userInfo = await db.get();
        setUser(userInfo.data() as UserModel);
        //set cookie token
        nookies.set(null, "token", token, {});
      }

      setUserLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
