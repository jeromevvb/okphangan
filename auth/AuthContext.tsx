import { createContext, Dispatch, SetStateAction } from "react";
import { UserModel } from "@models/user";

interface ContextInterface {
  user: UserModel | null;
  signOut: () => Promise<void>;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
}

const AuthContext = createContext<ContextInterface>({
  user: null,
  setUser: () => {},
  signOut: async () => {},
});

export default AuthContext;
