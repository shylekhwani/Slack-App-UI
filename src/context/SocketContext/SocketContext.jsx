import { createContext, useState } from "react";
import { io } from "socket.io-client";

import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { JOIN_CHANNEL, NEW_MESSAGE_RECEIVED_EVENT } from "@/utils/eventConstants";

const SocketContext = createContext();

export const SocketContextProvider = function({ children }) {

    const [currentChannel, setCurrentChannel] = useState(null);

    const { setMessageList, messageList } = useChannelMessages();


    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

    socket.on(NEW_MESSAGE_RECEIVED_EVENT, (data)=>{
        console.log('New Message Received', data);
        setMessageList([...messageList, data]);
    });

    async function joinChannel(channelId) {
        socket.emit(JOIN_CHANNEL, {channelId}, (data) => {
            console.log('SuccessFully Joined Channel', data);
            setCurrentChannel(data?.data);
        });
    }

    return (
        <SocketContext.Provider value={{socket, joinChannel, currentChannel}}>
           {children}
       </SocketContext.Provider>
    );
};

export default SocketContext;
