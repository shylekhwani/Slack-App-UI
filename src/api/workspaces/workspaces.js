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

export const fetchWorkspaceByIdRequest = async function ({workspaceId, token }) {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            headers: { 'x-access-token': token }
        });
        console.log('response in fetch workspace details request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('error in fetching workspace deatils request',error);
        throw error.response?.data || error.message;
    }
};

export const deleteWorkspaceByIdRequest = async function ({workspaceId, token }) {
  try {
    const response = await axios.delete(`/workspaces/${workspaceId}`,{
        headers:{'x-access-token': token }
    });
    console.log('response in Delete workspace request', response);
    return response?.data?.data;
  } catch (error) {
    console.log('error in Deleting workspace request',error);
    throw error.response?.data || error.message;
  }  
};

export const updateWorkspaceRequest = async function ({workspaceId, name, token }) {
    try {
      const response = axios.put(`/workspaces/${workspaceId}`, {name} ,{
        headers:{'x-access-token': token }
      });
      console.log('response in updating workspace request', response);
      return response?.data?.data;
    } catch (error) {
        console.log('error in Updating workspace request',error);
        throw error.response?.data || error.message;
    }
};