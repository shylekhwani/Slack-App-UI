import { useQuery } from "@tanstack/react-query";

import { getChannelDetailsByIdRequest } from "@/api/channel/channel";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useGetChannelDetails = function(channelId) {
    const {auth} = useAuthContext();

    const {isFetching, isSuccess, error, data: channels} = useQuery({
         queryKey: ['channelDetailsById', channelId],
         queryFn: () => getChannelDetailsByIdRequest({channelId, token: auth?.token }),
         staleTime: 30000
    });

    return {
        isFetching,
         isSuccess,
         error,
         channels
    };
};