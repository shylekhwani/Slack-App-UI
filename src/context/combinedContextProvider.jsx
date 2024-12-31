import { combineContext } from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext/authContextProvider";
import { CreateWorkspaceContextProvider } from "./WorkspaceContext/CreateWorkspaceContext";
import { WorkspacePreferenceModalProvider } from "./WorkspacePreferenceModalContext/WorkspacePreferenceModalContext";


export const CombinedContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalProvider
);