import { combineContext } from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext/authContextProvider";
import { CreateWorkspaceContextProvider } from "./WorkspaceContext/CreateWorkspaceContext";

export const CombinedContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
);