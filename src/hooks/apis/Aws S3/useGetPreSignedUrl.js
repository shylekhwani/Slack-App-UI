import { useQuery } from "@tanstack/react-query";

import { getPreSignedUrl } from "@/api/AWS S3/AwsS3";
import { useAuthContext } from "@/hooks/context/useAuthContext";

//////////////////////// This Hook is No use /////////////////////

export const useGetChannelDetails = function() {
    const {auth} = useAuthContext();

    const {isFetching, isSuccess, error, data: url} = useQuery({
         queryKey: ['getPreSignedUrl'],
         queryFn: () =>  getPreSignedUrl({ token: auth?.token }),
    });

    return {
        isFetching,
        isSuccess,
        error,
        url
    };
};

