import { createContext, useState } from "react";

const AddMemberContext = createContext();

export const AddMemberContextProvider = function({children}) {

    const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

     return(
        <AddMemberContext.Provider value={{openAddMemberModal, setOpenAddMemberModal}}>
            {children}
        </AddMemberContext.Provider>
     );
};

export default AddMemberContext;