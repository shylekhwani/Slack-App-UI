import { useMutation } from "@tanstack/react-query";

import { capturePaymentRequest } from "@/api/payments/payments";
import { useAuthContext } from "@/hooks/context/useAuthContext";

export const useCapturePayment = function() {
   const {auth} = useAuthContext();

   const {isPending, isSuccess, error, mutateAsync: capturePaymentMutation} = useMutation({

            mutationFn: ({orderId, status, paymentId, signature}) => capturePaymentRequest({ orderId, status, paymentId, signature, token: auth?.token}),
            onSuccess: (response) => {
                console.log('Sucessfully Payment Captured', response);
            },
            onError: (error) => {
                console.error('Failed to Capture Payment', error);
            }
   });
   return {
    isPending, 
    isSuccess,
    error,
   capturePaymentMutation
   };
};