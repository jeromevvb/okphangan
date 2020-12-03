import { createContext } from "react";
import firebase from "firebase/app";
import { UserModel } from "@models/auth";

const AuthContext = createContext<{
  user: UserModel | null;
  userLoading: boolean;
}>({
  user: null,
  userLoading: true,
});

export default AuthContext;
