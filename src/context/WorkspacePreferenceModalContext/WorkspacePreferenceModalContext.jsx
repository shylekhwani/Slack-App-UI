import { createContext, useState } from "react";

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalProvider = function({ children }) {

    const [openPreferenceModal, setOpenPreferenceModal] = useState(false);
    const [initialValue, setInitialValue] = useState('');

        return (
            <WorkspacePreferenceModalContext.Provider value={{openPreferenceModal, setOpenPreferenceModal, initialValue, setInitialValue }}>
                {children}
            </WorkspacePreferenceModalContext.Provider>
        );
};

export default WorkspacePreferenceModalContext;