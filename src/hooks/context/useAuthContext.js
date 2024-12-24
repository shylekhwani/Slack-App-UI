import { useContext } from "react";

import AuthContext from "@/context/AuthContext/authContextProvider";

export const useAuthContext = function() {
     return useContext(AuthContext);
};