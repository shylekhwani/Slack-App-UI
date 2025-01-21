import { createContext, useState } from "react";

const ChannelMessages = createContext();

export const ChannelMessagesProvider = function({ children }) {

    const [messageList, setMessageList] = useState(null);

    return(
        <ChannelMessages.Provider value={{messageList, setMessageList}}>
             {children}
        </ChannelMessages.Provider>
    );
};

export default ChannelMessages;