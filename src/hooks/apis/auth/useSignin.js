import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/api/auth/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignin = function() {
    const { toast } = useToast();
    
    const {isPending, isSuccess, error, mutateAsync: signInMutation} = useMutation({

        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log('Sucessfully signed up', data);
            toast({
                title: "Successfully Signed In",
                message: "Welcome To Slack",
                type: "Success"
            });
        },
        onError: (error) => {
            console.error('Failed to signUp', error);
            toast({
                title: "Failed Signed In",
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
            signInMutation
        };
};