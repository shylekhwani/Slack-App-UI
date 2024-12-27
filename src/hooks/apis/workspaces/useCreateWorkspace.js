import { useMutation } from "@tanstack/react-query";

import { createWorkspaceRequest } from "@/api/workspaces/workspaces";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useCreateWorkspace = function () {
    const { auth } = useAuthContext();

    const {isPending, isSuccess, error, mutateAsync: createWorkspaceMutation } = useMutation({

        mutationFn: (response) => createWorkspaceRequest({...response, token: auth?.token}),
        onSuccess: (response) => {
            console.log('Sucessfully Created Workspace', response);
        },
        onError: (error) => {
            console.error('Failed to Create Workspace', error);
        }
    });
    return {
        isPending,
        isSuccess,
        error,
        createWorkspaceMutation
    };
};