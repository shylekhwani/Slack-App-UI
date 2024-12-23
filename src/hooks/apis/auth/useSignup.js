import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/api/auth/auth";
import { useToast } from "@/hooks/use-toast";


export const useSignup = function() { 
    const { toast } = useToast();
    // this function using reactQuery to call mutation and it returns "signUpMutation".
     const {isPending, isSuccess, error, mutateAsync: signUpMutation} = useMutation({

        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Sucessfully signed up', data);
            toast({
                title: "Successfully Signed up",
                message: "You will be redirected to login page",
                type: "Success"
            });
        },
        onError: (error) => {
            console.error('Failed to signUp', error);
            toast({
                title: "Failed Signed up",
                message: error.message,
                type: "Error",
                variant: "destructive"
            });
        }

     });

     return {
        isPending,
        isSuccess,
        error,
        signUpMutation
     };
};