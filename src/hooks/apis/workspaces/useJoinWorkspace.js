import { useMutation, useQueryClient } from "@tanstack/react-query";

import { joinWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useJoinWorkspace = function(workspaceId) {
   const {auth} = useAuthContext();
   const queryClient = useQueryClient();

   const {isPending, isSuccess, error, mutateAsync:joinWorkspaceMutation} = useMutation({
     
         mutationFn: (joinCode) => joinWorkspaceRequest({workspaceId, joinCode, token: auth?.token}),
         onSuccess: (response) => {
             console.log('Sucessfully joined to Workspace', response);
             queryClient.invalidateQueries(['fetchWorkspaceById', workspaceId]);
         },
         onError: (error) => {
             console.error('Failed to Join Workspace', error);
         }
   });
   return {
    isPending, 
    isSuccess,
    error,
    joinWorkspaceMutation
   };
};