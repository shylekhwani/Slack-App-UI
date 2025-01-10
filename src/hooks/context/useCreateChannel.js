import { useContext } from "react";

import CreateChannelContext from "@/context/ChannelContext/createChannelContext";

export const useCreateChannelModal = function() {
    return useContext(CreateChannelContext);
};