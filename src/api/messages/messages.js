import axios from "@/config/axiosConfig";

export const getMessagesRequest = async function ({ channelId, limit, offset, token }) {
    // console.log("Token being sent:", token); // Debug log
    try {
        const response = await axios.get(`/messages/${channelId}`, {
            params: {
                limit: limit || 20,
                offset: offset || 0,
            },
            headers: { "x-access-token": token }, // Ensure this header is present
        });
        console.log("Response in Get Message request:", response);
        return response?.data?.data;
    } catch (error) {
        console.error("Error in fetching Messages request:", error.response || error);
        throw error.response?.data || error.message;
    }
};
