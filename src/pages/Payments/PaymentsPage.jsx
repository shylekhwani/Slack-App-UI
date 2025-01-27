import { useState } from "react";

import { RenderRazorpayPopup } from "@/components/molecules/RenderRazarpayPopUp/RenderRazarpayPopup";
import { useCreateOrder } from "@/hooks/apis/Payments/useCreateOrder";

const Payment = () => {
    const [amount, setAmount] = useState(''); // State to track the entered amount
    const [orderResponse, setOrderResponse] = useState(null); // State to store the order response from the backend
  
    // Custom hooks for creating the order
    const { isPending, isSuccess, createOrderMutation } = useCreateOrder();
  
    // Function to handle form submission and initiate payment
    const handlePayment = async function (e) {
      e.preventDefault(); // Prevent the form's default submit behavior
  
      // Validate the entered amount
      if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid amount.');
        return;
      }
  
      alert(`You are about to pay ₹${amount}`); // Alert the user about the payment
  
      // Call the backend to create an order
      const response = await createOrderMutation(amount * 100); // Amount in paise
      setOrderResponse(response); // Store the order response
      setAmount(''); // Clear the input field after submission
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Make Payment
          </h1>
          <form onSubmit={handlePayment} className="space-y-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Enter Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount} // Bind input value to `amount` state
              onChange={(e) => setAmount(e.target.value)} // Update `amount` on input change
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
            />
            <button
              type="submit"
              disabled={isPending} // Disable the button while the order is being created
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              Pay
            </button>
            {/* Render Razorpay popup only if the order is successfully created */}
            {isSuccess && (
              <RenderRazorpayPopup
                amount={amount * 100} // Pass the amount in paise
                orderId={orderResponse?.id} // Pass the order ID from the backend
                keyId={'rzp_test_oWlYBil15qGSSC'} // Pass the Razorpay key ID
                currency={'INR'} // Pass the currency type
              />
            )}
          </form>
        </div>
      </div>
    );
  };
  
  export default Payment;