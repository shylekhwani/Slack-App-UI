import { useContext } from "react";

import CreateWorkspaceContext from "@/context/WorkspaceContext/CreateWorkspaceContext";

export const useCreateWorkspaceModalContext = function() {
     return useContext(CreateWorkspaceContext);
};