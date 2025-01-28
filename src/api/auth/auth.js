import axios from "@/config/axiosConfig";

export const signUpRequest = async function ({email, password, username}) {
    try {
        const response = await axios.post('/users/signup',{
            email,
            password,
            username,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
};

export const signInRequest = async function ({email, password}) {
    try {
        const response = await axios.post('/users/signin',{
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
};

export const forgotPasswordRequest = async function ({email}) {
    try {
        const response = await axios.post('/users/forgot-password',{
            email
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response?.data || { message: "Unknown error occurred" };
    }
};

export const confirmPasswordRequest = async function ({resetToken, newPassword}) {
   try {
         const response = await axios.post('/users/reset-password',{
            resetToken,
            newPassword
        });
        return response.data;
    } catch (error) {
    console.log(error);
    throw error.response?.data || { message: "Unknown error occurred" };
    }  
};