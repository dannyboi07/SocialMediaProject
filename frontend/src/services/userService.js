import axios from "axios";
const baseUrl = "http://192.168.42.230:3500/api/user";

async function getUser(userName, token = null) {
    // console.log(token);
    if (token) {
        const response = await axios.get(`${baseUrl}?uname=${userName}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        // console.log(response.data);
        return response.data;
    } else {
                
        const response = await axios.get(`${baseUrl}?uname=${userName}`);
        return response.data;
    };
};

async function followUser(followUId, token) {
    console.log(token);

    const response = await axios.post(`${baseUrl}/follow/${followUId}`, null,{
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response.data;
};

async function unFollowUser(unFollowUId, token) {
    
    const response = await axios.delete(`${baseUrl}/follow/${unFollowUId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    return response.data;
};

export { getUser, followUser, unFollowUser };