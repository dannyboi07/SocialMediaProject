import axios from "axios";
const baseUrl = "http://192.168.42.206:3500/api/search";

async function getSearch(searchParam) {
    try {
        const response = await axios.get(`${baseUrl}?query=${searchParam}`);
        return response.data;
    } catch(err) {
        console.error(err);
    }
    
};

export { getSearch };