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
      const response = await axios.put(`/workspaces/${workspaceId}`, {name} ,{
        headers:{'x-access-token': token }
      });
      console.log('response in updating workspace request', response);
      return response?.data?.data;
    } catch (error) {
        console.log('error in Updating workspace request',error);
        throw error.response?.data || error.message;
    }
};

export const addChannelToWorkspaceRequest = async function ({workspaceId, channelName, token}) {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/channels`, {channelName} ,{
          headers:{'x-access-token': token }
        });
        console.log('response in Adding Channel to workspace request', response);
        return response?.data?.data;
      } catch (error) {
          console.log('error in  Adding Channel to workspace request',error);
          throw error.response?.data || error.message;
      }
};

export const resetWorkspaceJoinCodeRequest = async function ({workspaceId, token}) {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`,{},{
          headers:{'x-access-token': token }
        });
        console.log('response in reset workspace joinCode request', response);
        return response?.data?.data;
      } catch (error) {
          console.log('error in reset workspace joinCode request',error);
          throw error.response?.data || error.message;
    }
};

export const joinWorkspaceRequest = async function ({workspaceId, joinCode, token}) {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/join`, {joinCode} ,{
            headers:{'x-access-token': token }
        });
        console.log('response in Joining to workspace request', response);
        return response?.data?.data;
    } catch (error) {
        console.log('error in Joining to workspace request',error);
        throw error.response?.data || error.message;
    }
};

export const addMemberToWorkspaceRequest = async function ({workspaceId, memberId, role='member', token}) {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/members`, {memberId, role} ,{
            headers:{'x-access-token': token }
          });
          console.log('response in Adding Member to workspace request', response);
          return response?.data?.data;
    } catch (error) {
        console.log('error in Adding Member to workspace request',error);
        throw error.response?.data || error.message;
    }
};