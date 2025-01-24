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
        return response;
    } catch (error) {
        console.error("Error in create order request:", error.response || error);
        throw error.response?.data || error.message;
    }
};
