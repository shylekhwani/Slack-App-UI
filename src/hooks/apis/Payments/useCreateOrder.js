import { useMutation } from "@tanstack/react-query";

import { createOrderRequest } from "@/api/payments/payments";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useCreateOrder = function() {
  const {auth} = useAuthContext();

  const {isPending, isSuccess, error, mutateAsync: createOrderMutation} = useMutation({

     mutationFn: (amount) => createOrderRequest({amount, token: auth?.token}),
        onSuccess: (response) => {
            console.log('Sucessfully order created', response);
        },
        onError: (error) => {
            console.error('Failed to create order', error);
        }
  });
  return {
    isPending, 
    isSuccess,
    error,
    createOrderMutation
   };
};