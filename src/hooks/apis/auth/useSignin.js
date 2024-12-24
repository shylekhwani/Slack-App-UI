import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/api/auth/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignin = function() {
    const { toast } = useToast();
    
    const {isPending, isSuccess, error, mutateAsync: signInMutation} = useMutation({

        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Sucessfully signed In', response);

            const userObject = JSON.stringify(response.data);
            // Convert the user data returned from the API (response.data) into a JSON string format. 
            // This is necessary because localStorage only supports string values.

            localStorage.setItem('user', userObject);
            // Store the serialized user object in localStorage under the key 'user'. 
            // This allows the app to persist user information across sessions, even after page reloads or browser restarts.

            localStorage.setItem('token', response.data.token);
            // Save the token separately for API calls. Access it directly from the original `response.data` object.

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