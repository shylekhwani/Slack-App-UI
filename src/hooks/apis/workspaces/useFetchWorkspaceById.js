import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceByIdRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useFetchWorkspaceById = function(id) {
     const {auth} = useAuthContext();

     const {isFetching, isSuccess, error, data: workspace} = useQuery({
       queryFn: () => fetchWorkspaceByIdRequest({workspaceId: id, token: auth?.token}),
       queryKey: [`fetchWorkspaceById-${id}`],
       staleTime: 30000
     });

     return {
        isFetching,
        isSuccess, 
        error,
        workspace
    };
};