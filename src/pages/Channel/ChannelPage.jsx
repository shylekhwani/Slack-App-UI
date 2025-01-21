import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ChannelHeader } from "@/components/molecules/Channels/ChannelHeader/ChannelHeader";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelDetails } from "@/hooks/apis/channel/useGetChannelDetails";
import { useGetMessages } from "@/hooks/apis/messages/useGetMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocketContext";

import { ChatInput } from "../../components/molecules/ChatInput/ChatInput";

export const ChannelPage = function() {
    const { channelId } = useParams();
    const queryClient = useQueryClient();

    const { isFetching, error, channels } = useGetChannelDetails(channelId);
    const { joinChannel } = useSocket();
    const { isFetching: fetchingMsg, isSuccess, messages } = useGetMessages(channelId);
    const { setMessageList, messageList } = useChannelMessages();
    
    useEffect(() => {
        if (!isFetching && !error) {
            joinChannel(channelId);
        }
    }, [isFetching, error, joinChannel, channelId]);

    useEffect(() => {
       if (isSuccess) {
           setMessageList(messages);
       }
    },[isSuccess, messages, setMessageList]);

    useEffect(() => {
       queryClient.invalidateQueries('fetchedMessages', channelId);
    },[channelId, queryClient]);

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2Icon className="w-6 h-6 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
                <TriangleAlertIcon className="w-8 h-8 text-red-500" />
                <span className="text-gray-600 text-lg font-semibold">Channel Not Found</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Channel Header */}
            <div className="flex-none p-4 border-b border-gray-200 bg-white">
                <ChannelHeader name={channels?.name} />
            </div>

            {/* Messages Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!fetchingMsg && messageList?.map((message) => (
                    <Message
                        key={message._id}
                        authorImage={message.userId?.avatar}
                        authorName={message.userId?.username}
                        createdAt={message.createdAt}
                        body={message.body}
                    />
                ))}
            </div>

            {/* Chat Input Section */}
            <div className="flex-none p-4 border-t border-gray-200 bg-white">
                <ChatInput />
            </div>
        </div>
    );
};
