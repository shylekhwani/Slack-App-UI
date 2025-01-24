import axios from 'axios';

import axiosConfig from "@/config/axiosConfig";

export const uploadImageToAWS_PresignedUrl = async function ({ url, file }) {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type
            }
        });
        console.log('Response in uploading image to S3', response);
        return response;
    } catch (error) {
        console.error("Error in uploading image to S3:", error.response || error);
        throw error.response?.data || error.message;
    }
};

export const getPreSignedUrl = async function ({ token }) {
    try {
        const response = await axiosConfig.get('/messages/pre-signed-url' , {
            headers: {
                'x-access-token': token
            }
        });
        console.log('Response in PreSignedUrl request', response);
        return response?.data?.data;
    } catch (error) {
        console.error("Error in PreSignedUrl request:", error.response || error);
        throw error.response?.data || error.message;
    }
};