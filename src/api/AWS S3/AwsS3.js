import axios from 'axios';

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