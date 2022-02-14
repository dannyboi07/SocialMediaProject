import axios from "axios";
const baseUrl = "http://localhost:3500/api/register";

async function registerUser(userDetails) {
  const response = await axios.post(baseUrl, userDetails, { headers: { "Content-Type": "multipart/form-data" }});
  return response.data;
};

export { registerUser };