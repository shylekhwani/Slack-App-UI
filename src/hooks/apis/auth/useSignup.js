import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/api/auth/auth";

export const useSignup = function() { 
    // this function using reactQuery to call mutation and it returns "signUpMutation".
     const {isPending, isSuccess, error, mutateAsync: signUpMutation} = useMutation({

        mutationFn: signUpRequest,
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
        signUpMutation
     };
};