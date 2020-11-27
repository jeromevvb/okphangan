import { useEffect, useState } from "react";
import nookies from "nookies";
import firebase from "../services/firebase";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log("auth provider", user);

      if (!user) {
        setUser(null);
        nookies.set(null, "token", "", {});
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(null, "token", token, {});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
