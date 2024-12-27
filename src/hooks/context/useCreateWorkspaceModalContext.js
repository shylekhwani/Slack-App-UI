import { useContext } from "react";

import CreateWorkspaceContext from '@/context/WorkspaceContext/createWorkspaceContext';

export const useCreateWorkspaceModalContext = function() {
     return useContext(CreateWorkspaceContext);
};