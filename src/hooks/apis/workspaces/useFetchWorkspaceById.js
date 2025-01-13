import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceByIdRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useFetchWorkspaceById = function(id) {
     const {auth} = useAuthContext();

     const {isFetching, isSuccess, error, data: workspace} = useQuery({
       queryKey: ['fetchWorkspaceById', id],
       queryFn: () => fetchWorkspaceByIdRequest({workspaceId: id, token: auth?.token}),
       staleTime: 10000,
       retry: 2, // Retry twice on failure
     });

     return {
        isFetching,
        isSuccess, 
        error,
        workspace
    };
};