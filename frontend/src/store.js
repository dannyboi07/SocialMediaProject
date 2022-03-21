import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import postblogReducer from "./reducers/postblogReducer";
// import usersReducer from "./reducers/usersReducer";
import fullScreenReducer from "./reducers/fullScreenReducer";

const reducer = combineReducers({ 
  user: userReducer,
  postblog: postblogReducer,
  fullscreenData: fullScreenReducer,
  // findUser: usersReducer
});

const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunk))
);
// store.subscribe(() => console.log(store.getState()));

export default store;
