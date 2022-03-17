import axios from "axios";
const baseUrl = "http://localhost:3500/api/search";

async function getSearch(searchParam) {
    const response = await axios.get(`${baseUrl}?query=${searchParam}`);
    return response.data;
};

export { getSearch };