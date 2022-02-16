import { registerUser } from "../services/registerService";
import { loginUser } from "../services/loginService";

const initialState = {
  profImgSrc: null,
  name: "",
  username: "",
  password: "",
};

export default function userReducer(state = null, action) {
  console.log(action);
  switch(action.type) {
    case "LOGIN":

      const { token, name, username, profImgSrc } = action.data;

      window.localStorage.setItem("socialMediaAppUser", JSON.stringify({ name, username, token,profImgSrc }));

      return state = { name, username, token, profImgSrc };

    case "SET_USER": 

      return state = { name: action.data.name, username: action.data.username, token: action.data.token, profImgSrc: action.data.profImgSrc };
    
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
    dispatch({
      type: "LOGIN",
      data: resUserDetails
    });
  };
};

export { initializeUser, dispatchRegister, dispatchLogin };