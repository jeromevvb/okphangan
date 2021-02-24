import { createContext } from "react";
import { UserModel } from "@models/user";

interface ContextInterface {
  user: UserModel | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<ContextInterface>({
  user: null,
  signOut: async () => {},
});

export default AuthContext;
