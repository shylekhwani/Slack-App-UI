import { useMutation } from "@tanstack/react-query";

import { forgotPasswordRequest } from "@/api/auth/auth";


export const useForgotPassword = function() {
  
    const {isLoading, isSuccess, error, mutateAsync: forgotPasswordMutation} = useMutation({

            mutationFn: (email) => forgotPasswordRequest({ email }),

            onSuccess: (data) => {
                console.log('Sucessfully Password forgot hook', data);
            },
            onError: (error) => {
                console.error('Failed to password forgot hook', error);
            }
    });
    return {
        isLoading,
        isSuccess,
        error,
        forgotPasswordMutation
    };
};