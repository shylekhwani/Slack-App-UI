import { useContext } from "react";

import WorkspacePreferenceModalContext from "../../context/WorkspacePreferenceModalContext/WorkspacePreferenceModalContext";

export const useWorkspacePreferenceModal = function() {
 return useContext(WorkspacePreferenceModalContext);
};