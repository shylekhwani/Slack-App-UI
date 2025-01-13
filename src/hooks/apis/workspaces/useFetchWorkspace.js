import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useFetchWorkspace = function () {
    const { auth } = useAuthContext();

    const {isFetching, isSuccess, error, data: workspaces} = useQuery({
     queryKey: ['fetchWorkspaces', auth?.token],
     queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
     staleTime: 30000
    });

    return {
     isFetching,
     isSuccess, 
     error,
     workspaces 
    };
};