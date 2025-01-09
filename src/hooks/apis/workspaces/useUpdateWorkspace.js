import { useMutation } from "@tanstack/react-query";

import { updateWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useUpdateWorkspace = function(workspaceId) {
   const {auth} = useAuthContext();

   const {isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation} = useMutation({

      mutationFn: (name) => updateWorkspaceRequest ({workspaceId, name, token: auth?.token}),
       onSuccess: (response) => {
                 console.log('Workspace Updated Sucessfully', response);
            },
        onError: (error) => {
                 console.error('Failed to Update Workspace', error);
             }
   });
    return {
        isPending,
        isSuccess,
        error,
        updateWorkspaceMutation
    };
};