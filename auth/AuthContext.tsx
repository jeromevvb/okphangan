import { createContext } from "react";
import firebase from "firebase/app";
import { UserModel } from "@models/auth";

interface ContextInterface {
  user: UserModel | null;
  userLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<ContextInterface>({
  user: null,
  userLoading: true,
  signOut: async () => {},
});

export default AuthContext;
