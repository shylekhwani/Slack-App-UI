import { useContext } from "react";

import AddMemberContext from "../../context/MemberContext/addMemberContext";

export const useAddMemberModal = function() {
    return useContext(AddMemberContext);
};