import { useContext } from "react";

import CreateChannelContext from "@/context/ChannelContext/CreateChannelContext";

export const useCreateChannelModal = function() {
    return useContext(CreateChannelContext);
};

