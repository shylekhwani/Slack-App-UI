import  { useMutation }  from "@tanstack/react-query";

import { addMemberToWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useAddMember = function(workspaceId) {
   const {auth} = useAuthContext();

   const {isPending, isSuccess, error, mutateAsync: addMemberMutation} = useMutation({

    mutationFn: (memberId) => addMemberToWorkspaceRequest({workspaceId, memberId, token: auth?.token}),
    onSuccess: (response) => {
        console.log('Sucessfully Member Added to Workspace', response);
    },
    onError: (error) => {
        console.error('Failed to Add Member into Workspace', error);
    }
   });
   return {
    isPending, 
    isSuccess,
    error,
    addMemberMutation
   };
};