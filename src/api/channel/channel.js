import axios from "@/config/axiosConfig";

export const getChannelDetailsByIdRequest = async function ({ channelId, token }) {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {'x-access-token': token}
        });
        console.log('response in channel details request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('error in channel details request',error);
        throw error.response.data;
    }
};