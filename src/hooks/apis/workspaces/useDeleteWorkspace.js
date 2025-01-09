import { useMutation } from "@tanstack/react-query";

import { deleteWorkspaceByIdRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useDeleteWorkspace = function (workspaceId) {
    console.log('id',workspaceId);
    const {auth} = useAuthContext();

    const {isPending, isSuccess, error, mutateAsync: deleteWorkspaceMutation} = useMutation({

     mutationFn: () => deleteWorkspaceByIdRequest ({workspaceId, token: auth?.token}),
            onSuccess: (response) => {
                console.log('Workspace deleted Sucessfully', response);
            },
            onError: (error) => {
                console.error('Failed to Delete Workspace', error);
            }
    });
        return {
        isPending,
        isSuccess,
        error,
        deleteWorkspaceMutation
    };
};