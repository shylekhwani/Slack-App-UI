import axios from "@/config/axiosConfig";

export const createOrderRequest = async function ({ token, amount }) {
    try {
        const response = await axios.post('/payments/order', {
            amount 
        }, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in create order request', response);
        return response?.data?.data;
    } catch (error) {
        console.error("Error in create order request:", error.response || error);
        throw error.response?.data || error.message;
    }
};

export const capturePaymentRequest = async function ({token, orderId, status, paymentId, signature}) {
    try {
        const response = await axios.post('/payments/capture', {
            orderId,
            status,
            paymentId,
            signature
        }, {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in capture payment request', response);
        return response?.data?.data;
    } catch (error) {
        console.error("Error in capture payment request:", error.response || error);
        throw error.response?.data || error.message;
    }
};