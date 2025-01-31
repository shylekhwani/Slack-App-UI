import { useContext } from "react";

import AddMemberContext from "@/context/MemberContext/AddMemberContext";

export const useAddMemberModal = function() {
    return useContext(AddMemberContext);
};