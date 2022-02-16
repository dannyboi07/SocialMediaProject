import axios from "axios";
const baseUrl = "http://localhost:3500/api/content";

async function getAllService() {
  const response = await axios.get(baseUrl);
  return response.data;
};

async function getPostLikes(postId) {
  const response = await axios.get(`${baseUrl}/post/likes/${postId}`);
  return response.data;
}

export { getAllService, getPostLikes };