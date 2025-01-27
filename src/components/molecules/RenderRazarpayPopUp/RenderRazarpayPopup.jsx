import { useEffect } from "react";

import { useCapturePayment } from "@/hooks/apis/Payments/useCapturePayments";

// Function to dynamically load the Razorpay script
const loadRazorpayScript = function (src) {
    return new Promise((res) => {
      const script = document.createElement('script');
      script.src = src;
  
      // Event triggered when the script is successfully loaded
      script.onload = function () {
        console.log('Razorpay script loaded'); // Debug log for successful script load
        res(true); // Resolve the promise with true
      };
  
      // Event triggered if there's an error loading the script
      script.onerror = function () {
        console.log('Error in loading Razorpay script'); // Debug log for script loading error
        res(false); // Resolve the promise with false
      };
  
      // Append the script to the document body to load it
      document.body.appendChild(script);
    });
  };
  
  // Component to render Razorpay payment popup
  export const RenderRazorpayPopup = function ({
    orderId,
    keyId,
    currency,
    amount,
  }) {
    // Custom hook for handling payment capture logic
    const { capturePaymentMutation } = useCapturePayment();
  
    // Function to display the Razorpay payment popup
    const display = async function (options) {
      // Load the Razorpay script dynamically
      const scriptResponse = await loadRazorpayScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      );
  
      // If script fails to load, log and stop further execution
      if (!scriptResponse) {
        console.log('Error in loading Script'); // Debug log
        return;
      }
  
      // Initialize the Razorpay instance with the provided options
      const rzp = new window.Razorpay(options);
  
      // Handle payment failure scenario
      rzp.on('payment.failed', async function (response) {
        console.log('Payment failed', response.error.code); // Debug log for failure
        // Update the backend about the payment failure
        await capturePaymentMutation({
          orderId: options.order_id,
          status: 'failed',
          paymentId: '', // Payment ID is not available on failure
        });
      });
  
      // Open the Razorpay popup for the user
      rzp.open();
    };
  
    // Run the `display` function when `orderId` changes (or on component mount)
    useEffect(() => {
      display({
        key: keyId, // Razorpay API key
        amount, // Amount to be paid in the smallest currency unit (paise)
        currency, // Currency type (e.g., INR)
        name: 'Yash Lekhwani', // Merchant or company name
        description: 'Test Transaction', // Payment description
        order_id: orderId, // Order ID generated from the backend
        handler: async (response) => {
          // Payment success handler
          console.log('Payment success', response); // Debug log for success
          console.log('Signature', response.razorpay_signature); // Debug log for signature
  
          // Notify the backend about the successful payment
          await capturePaymentMutation({
            orderId: response?.razorpay_order_id,
            status: 'success',
            paymentId: response?.razorpay_payment_id, // Payment ID from Razorpay
            signature: response?.razorpay_signature, // Signature for verification
          });
          // Redirect the user to a custom success page (if needed)
        },
      });
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);
  
    // This component renders nothing as it's used for Razorpay popup functionality
    return null;
  };