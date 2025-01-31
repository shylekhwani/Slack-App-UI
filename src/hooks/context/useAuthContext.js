import { useContext } from "react";

import AuthContext from "@/context/AuthContext/AuthContextProvider";

export const useAuthContext = function() {
     return useContext(AuthContext);
};