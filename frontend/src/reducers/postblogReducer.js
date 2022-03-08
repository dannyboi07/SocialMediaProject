import { createPost, getAllService } from "../services/contentService";

export default function postblogReducer(state = null, action) {
  switch(action.type) {
    case "GET_ALL":
      return state = { ...action.data };
    case "GET_BLOGS":
      return state = { ...action.data };
    case "GET_POSTS":
      return state = { ...action.data };
    case "CREATE_POST":
      return state = {
        posts: [ ...action.data, ...state.posts],
        blogs: [ ...state.blogs ]
      };
    default:
      return state;
  };
};

function getAll() {
  return async dispatch => {
    const all = await getAllService();
    dispatch({
      type: "GET_ALL",
      data: all
    });
  };
};

function sendPost(postContent, token) {
  return async dispatch => {
    const response = await createPost(postContent, token);
    // console.log(1, response);
    dispatch({
      type: "CREATE_POST",
      data: response
    });
  };
}

export { getAll, sendPost };