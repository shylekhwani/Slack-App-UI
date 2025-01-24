import { useState } from "react";

import { RenderRazorpayPopup } from "@/components/molecules/RenderRazarpayPopUp/RenderRazarpayPopup";
import { useCreateOrder } from "@/hooks/apis/Payments/useCreateOrder";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [orderResponse, setOrderResponse] = useState(null);

  const { isPending, isSuccess, createOrderMutation } = useCreateOrder();

  const handlePayment = async function(e) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    alert(`You are about to pay ₹${amount}`);
    const response = await createOrderMutation(amount*100);
    setOrderResponse(response?.data?.data);
    setAmount('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6"> Make Payment</h1>
        <form
          onSubmit={handlePayment}
          className="space-y-4"
        >
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
            Enter Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Pay
          </button>
          {isSuccess && <RenderRazorpayPopup
             amount={amount*100}
             orderId={orderResponse?.id}
             keyId={import.meta.env.VITE_RAZAORPAY_KEY_ID}
             currency={'INR'}
          />}
        </form>
      </div>
    </div>
  );
};

export default Payment;
