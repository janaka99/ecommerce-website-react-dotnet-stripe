import { createContext } from "react";
import { AuthStateType } from "./types";

const AuthContext = createContext<AuthStateType>({} as AuthStateType);

export default AuthContext;
