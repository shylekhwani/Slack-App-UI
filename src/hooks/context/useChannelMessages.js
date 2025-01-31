import { useContext } from "react";

import ChannelMessages from "../../context/MessagesContext/ChannelMessages";

export const useChannelMessages = function() {
    return useContext(ChannelMessages);
};