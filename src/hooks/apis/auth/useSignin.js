import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/api/auth/auth";

export const useSignin = function() {
    const {isPending, isSuccess, error, mutateAsync: signInMutation} = useMutation({

        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log('Sucessfully signed up', data);
        },
        onError: (error) => {
            console.error('Failed to signUp', error);
        }

    });
    return {
        isPending,
        isSuccess,
        error,
        signInMutation
     };
};