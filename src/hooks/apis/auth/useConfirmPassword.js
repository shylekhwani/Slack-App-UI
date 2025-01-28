import { useMutation } from "@tanstack/react-query";

import { confirmPasswordRequest } from "@/api/auth/auth";


export const useConfirmPassword = function() {
  
    const {isPending, isSuccess, error, mutateAsync: confirmPasswordMutation} = useMutation({

            mutationFn: ({resetToken, newPassword}) => confirmPasswordRequest({resetToken, newPassword}),

            onSuccess: (data) => {
                console.log('Sucessfull in confirm Password  hook', data);
            },
            onError: (error) => {
                console.error('Failed in confirm password hook', error);
            }
    });
    return {
        isPending,
        isSuccess,
        error,
        confirmPasswordMutation
    };
};