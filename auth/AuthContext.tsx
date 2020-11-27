import { createContext } from "react";
import firebase from "../services/firebase";

const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});

export default AuthContext;
