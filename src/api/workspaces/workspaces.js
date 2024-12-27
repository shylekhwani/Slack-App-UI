import axios from "@/config/axiosConfig";

export const createWorkspaceRequest = async function ({name, description, token}) {
    try {
        const response = await axios.post('/workspaces', {name, description, token}, {
            headers: {'x-access-token': token}
        });
        console.log('response in create workspace request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('error in create workspace request',error);
        throw error.response.data;
    }
};

export const fetchWorkspaceRequest = async function ({token}) {
    try {
        const response = await axios.get('/workspaces', {
            headers: {'x-access-token': token}
        });
        console.log('response in fetch workspace request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('error in fetching workspace request',error);
        throw error.response?.data || error.message;
    }
};