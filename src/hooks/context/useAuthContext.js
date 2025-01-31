import { useContext } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";

export const useAuthContext = function() {
     return useContext(AuthContext);
};