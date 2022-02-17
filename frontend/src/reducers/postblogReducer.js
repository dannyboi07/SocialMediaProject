import { getAllService } from "../services/contentService";

export default function postblogReducer(state = null, action) {
  switch(action.type) {
    case "GET_ALL":
      return state = { ...action.data };
    case "GET_BLOGS":
      return state = { ...action.data };
    case "GET_POSTS":
      return state = { ...action.data };
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

export { getAll };