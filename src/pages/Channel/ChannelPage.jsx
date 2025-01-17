import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom";

import { ChannelHeader } from "@/components/molecules/Channels/ChannelHeader/ChannelHeader";
import { useGetChannelDetails } from "@/hooks/apis/channel/useGetChannelDetails";

import { ChatInput } from "../../components/molecules/ChatInput/ChatInput";

export const ChannelPage = function() {
    const { channelId } = useParams();
    console.log(channelId);

    const { isFetching, isSuccess, error, channels } = useGetChannelDetails(channelId);

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
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Channel Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <ChannelHeader name={channels?.name} />
            </div>

            {/* Chat Input Section */}
            <div className="border-t border-gray-200 p-4 pb-8 bg-white">
                <ChatInput />
            </div>
        </div>
    );
};
