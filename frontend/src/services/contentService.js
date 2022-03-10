import axios from "axios";
const baseUrl = "http://192.168.42.230:3500/api/content";

async function getAllService() {
  const response = await axios.get(baseUrl);
  return response.data;
};

async function getPostLikes(postId) {
  const response = await axios.get(`${baseUrl}/post/likes/${postId}`);
  return response.data;
};

async function createPost(postContent, token) {
  const response = await axios.post(`${baseUrl}/createPost/`, postContent, { 
    headers: {
      "Authorization" : `Bearer ${token}`
    }
  });

  return response.data;
};

async function likedOrNot(postId, userId) {
  const response = await axios.get(`${baseUrl}/post/liked/${postId}?user_id=${userId}`);

  return response.data;
};

async function likePost(postId, token) {
  const response = await axios.post(`${baseUrl}/post/like/${postId}`, null, { 
    headers: {
      "Authorization": `Bearer ${token}`
    } 
  });
  return response.data;
};

async function unlikePost(postId, token) {
  const response = await axios.delete(`${baseUrl}/post/like/${postId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return response.data;
};

export { getAllService, getPostLikes, createPost, likedOrNot, likePost, unlikePost };