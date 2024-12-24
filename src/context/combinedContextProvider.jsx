import { combineContext } from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext/authContextProvider";

export const CombinedContextProvider = combineContext(
    AuthContextProvider
);