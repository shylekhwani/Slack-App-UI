import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { ChannelHeader } from "@/components/molecules/Channels/ChannelHeader/ChannelHeader";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelDetails } from "@/hooks/apis/channel/useGetChannelDetails";
import { useGetMessages } from "@/hooks/apis/messages/useGetMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocketContext";

import { ChatInput } from "../../components/molecules/ChatInput/ChatInput";

export const ChannelPage = function() {
    const { channelId } = useParams(); // Extract the channel ID from the route parameters.
    const queryClient = useQueryClient(); // React Query client instance for invalidating queries.

    // Fetch channel details for the given channel ID.
    const { isFetching, error, channels } = useGetChannelDetails(channelId);
    const { joinChannel } = useSocket(); // Custom hook to manage socket events.

    // Fetch messages for the given channel ID.
    const { isFetching: fetchingMsg, isSuccess, messages } = useGetMessages(channelId);

    // Custom hook to manage the state of channel messages.
    const { setMessageList, messageList } = useChannelMessages();

    // Reference for the message container to enable auto-scroll.
    const messageContainerListRef = useRef(null);

    // Scroll to the bottom of the message container whenever the message list changes.
    useEffect(() => {
        if (messageContainerListRef.current) {
            messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight; // Auto-scroll to the latest message.
        }
    }, [messageList]);
    
    // Join the channel via socket once channel details are successfully fetched.
    useEffect(() => {
        if (!isFetching && !error) {
            joinChannel(channelId); // Join the specific channel using the socket connection.
        }
    }, [isFetching, error, joinChannel, channelId]);

    // Update local message list when messages are successfully fetched from the API.
    useEffect(() => {
       if (isSuccess) {
           setMessageList(messages); // Set the fetched messages to the local message list state.
       }
    }, [isSuccess, messages, setMessageList]);

    // Invalidate the cached messages whenever the channel ID changes.
    useEffect(() => {
       queryClient.invalidateQueries('fetchedMessages', channelId); // Clear the cache for old messages when switching channels.
    }, [channelId, queryClient]);

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
            <div ref={messageContainerListRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {!fetchingMsg && messageList?.map((message) => (
                    <Message
                        key={message._id}
                        authorImage={message.userId?.avatar}
                        authorName={message.userId?.username}
                        createdAt={message.createdAt}
                        body={message.body}
                        image={message.image}
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
