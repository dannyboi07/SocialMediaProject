import { registerUser } from "../services/registerService";
import { loginUser } from "../services/loginService";

const userDetails = JSON.parse(window.localStorage.getItem("socialMediaAppUser"));
let initialState = null;

if (userDetails) {
  initialState = {
    name: userDetails.name,
    username: userDetails.username,
    profImgSrc: userDetails.profImgSrc,
    token: userDetails.token,
    uId: userDetails.uId
  };
}

export default function userReducer(state = initialState, action) {
  // console.log(action);
  switch(action.type) {
    case "LOGIN":

      const { token, name, username, profImgSrc, uId } = action.data;

      return state = { name, username, token, profImgSrc, uId };

    case "SET_USER": 

      return state = { name: action.data.name, username: action.data.username, uId: action.data.uId, token: action.data.token, profImgSrc: action.data.profImgSrc };
    
    case "LOG_OUT":

      return state = action.data;

    default:
      return state;
  };
};

function initializeUser(userDetails) {
  return {
    type: "SET_USER",
    data: userDetails
  };
};

function dispatchRegister(userDetails) {
  return async dispatch => {
    const resRegUserDetails = await registerUser(userDetails);
    const resUserDetails = await loginUser({ 
      username: userDetails.get("username"), 
      password: userDetails.get("password") 
    });
    dispatch({
      type: "LOGIN",
      data: resUserDetails
    })
  };
};

function dispatchLogin(userDetails) {
  return async dispatch => {
    const resUserDetails = await loginUser(userDetails);
    const { token, name, username, profImgSrc, uId } = resUserDetails;
    window.localStorage.setItem("socialMediaAppUser", JSON.stringify({
      name, username, profImgSrc, token, uId
    }));

    dispatch({
      type: "LOGIN",
      data: resUserDetails
    });
  };
};

function dispatchLogOut() {
  return dispatch => {
    window.localStorage.removeItem("socialMediaAppUser");
    dispatch({
      type: "LOG_OUT",
      data: null
    });
  };
};

export { initializeUser, dispatchRegister, dispatchLogin ,dispatchLogOut };