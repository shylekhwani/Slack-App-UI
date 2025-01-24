import { useEffect } from "react";

const loadRazorpayScript = function(src) {
    return new Promise((res) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = function() {
            console.log('Razorpay script loaded');
            res(true);
        };
        script.onerror = function() {
            console.log('Error in loading Razorpay script');
            res(false);
        };

        document.body.appendChild(script);
    });
};

export const RenderRazorpayPopup = function({
    orderId,
    keyId,
    currency,
    amount
}) {
   const display = async function (options) {

    const scriptResponse = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

     if(!scriptResponse) {
        console.log('Error in loading Script');
        return;
     }

     const rzp = new window.Razorpay(options);

     rzp.on('payment.failed',async function (response){
        console.log('Payment failed', response.error.code);
        await ({
            orderId: options.order_id,
            status: 'failed',
            paymentId: '',
        });
    });

     rzp.open();
   };

   useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: "Yash Lekhwani", // name of the company
            description: "Test Transaction",
            order_id: orderId,
            handler: async (response) => {
                console.log('Payment success', response);
                console.log('Signature', response.razorpay_signature);
                await ({
                    orderId: orderId,
                    status: 'success',
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                });
                // redirect your user to your custom succesds page
            }
        });
        
   }, [amount, currency, keyId, orderId]);

   return null;

};