import axios from "axios";
const baseUrl = "http://localhost:3500/api/login";

async function loginUser(userDetails) {
  const response = await axios.post(baseUrl, userDetails);
  return response.data;
};

export { loginUser };