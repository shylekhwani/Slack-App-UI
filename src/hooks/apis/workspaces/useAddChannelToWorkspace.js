import  { useMutation }  from "@tanstack/react-query";

import { addChannelToWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useAddChannel = function(workspaceId) {
   const {auth} = useAuthContext();

   const {isPending, isSuccess, error, mutateAsync: addChannelMutation} = useMutation({

    mutationFn: (channelName) => addChannelToWorkspaceRequest({workspaceId, channelName, token: auth?.token}),
    onSuccess: (response) => {
        console.log('Sucessfully Channel Added to Workspace', response);
    },
    onError: (error) => {
        console.error('Failed to Add channel into Workspace', error);
    }
   });
   return {
    isPending, 
    isSuccess,
    error,
    addChannelMutation
   };
};