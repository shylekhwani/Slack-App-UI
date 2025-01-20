import { useContext } from "react";

import SocketContext from "@/context/SocketContext/SocketContext";

export const useSocket = function() {
    return useContext(SocketContext);
};