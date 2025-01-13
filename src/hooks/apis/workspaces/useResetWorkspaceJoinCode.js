import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resetWorkspaceJoinCodeRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useResetWorkspaceJoinCode = function(workspaceId) {
    const {auth} = useAuthContext();
    const queryClient = useQueryClient();

    const {isPending, isSuccess, error, mutateAsync: resetWorkspaceJoinCodeMutation} = useMutation({

     mutationFn: () => resetWorkspaceJoinCodeRequest({workspaceId, token: auth?.token}),
     onSuccess: (response) => {
                console.log('JoinCode reset sucessfully', response);
                queryClient.invalidateQueries(['fetchWorkspaceById', workspaceId]);
         },
     onError: (error) => {
                console.error('JoinCode reset Failed', error);
        }
   });
   return {
    isPending,
    isSuccess,
    error,
    resetWorkspaceJoinCodeMutation
  };
};