import { useQuery } from "@tanstack/react-query";

import { getMessagesRequest } from "@/api/messages/messages";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useGetMessages = function (channelId) {
    const { auth } = useAuthContext();

    const {isFetching, isSuccess, error, data: messages} = useQuery({
            queryKey: ['fetchedMessages', channelId],
            queryFn: () => getMessagesRequest({channelId, limit: 10, page: 1, token: auth?.token }),
            onError: (err) => {
                console.error("React Query error in useGetMessages:", err);
            },
     });
    return {
        isFetching,
         isSuccess,
         error,
         messages
    };
};