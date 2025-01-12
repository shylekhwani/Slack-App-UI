import { useContext } from "react";

import WorkspaceContext from "@/context/WorkspaceContext/WorkspaceContext";

export const useCurrentWorkspace = function() {
    return useContext(WorkspaceContext);
};