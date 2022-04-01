import { createPost, getAllService, likePost, unlikePost } from "../services/contentService";
import { setFailure } from "./failureReducer";

export default function postblogReducer(state = null, action) {
  switch(action.type) {
    case "GET_ALL":
      return state = { ...action.data };
    case "GET_BLOGS":
      return state = { ...action.data };
    case "GET_POSTS":
      return state = { ...action.data };
    case "CREATE_POST":
      return {
        posts: [ ...action.data, ...state.posts],
        blogs: [ ...state.blogs ]
      };
    case "LIKE_POST":
      return state = { ...state, posts: state.posts.map(post => post.p_id === action.data ? { likes: post.likes += 1, ...post } : post)};
    case "UNLIKE_POST":
      return state = { ...state, posts: state.posts.map(post => post.p_id === action.data ? { likes: post.likes -= 1, ...post } : post)};
    default:
      return state;
  };
};

function getAll(token) {
  return async dispatch => {

    let all;
    try {

      all = await getAllService(token);
    } catch (error) {

      console.error(error);
      dispatch(setFailure("CONTENT", {
        func: getAll,
        param: token
      }));
      return;
    };
    // Finally, if all good
    dispatch({
      type: "GET_ALL",
      data: all
    });
  };
};

function sendPost(postContent, token) {
  return async dispatch => {
    const response = await createPost(postContent, token);
    dispatch({
      type: "CREATE_POST",
      data: response
    });
  };
};

function likePostRdx(postId, token) {
  return async dispatch => {
    const response = await likePost(postId, token);
    if (response.success) {
      dispatch({
        type: "LIKE_POST",
        data: postId
      });
    };
  };
};

function unLikePostRdx(postId, token) {
  return async dispatch => {
    const response = await unlikePost(postId, token);
    if (response.success) {
      dispatch({
        type: "UNLIKE_POST",
        data: postId
      });
    };
  };
};

export { getAll, sendPost, likePostRdx, unLikePostRdx };