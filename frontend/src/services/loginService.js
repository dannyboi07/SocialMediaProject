import axios from "axios";
const baseUrl = "http://192.168.42.206:3500/api/login";

async function loginUser(userDetails) {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

export { loginUser };