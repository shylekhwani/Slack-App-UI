import { createContext, useState } from "react";

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalProvider = function({ children }) {

    const [openPreferenceModal, setOpenPreferenceModal] = useState(false);
    const [initialValue, setInitialValue] = useState('');
    const [workspace, setWorkspace] = useState(null);

        return (
            <WorkspacePreferenceModalContext.Provider value={{openPreferenceModal, setOpenPreferenceModal, initialValue, setInitialValue, workspace, setWorkspace }}>
                {children}
            </WorkspacePreferenceModalContext.Provider>
        );
};

export default WorkspacePreferenceModalContext;