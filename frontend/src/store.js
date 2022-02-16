import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import postblogReducer from "./reducers/postblogReducer";

const reducer = combineReducers({ 
  user: userReducer,
  postblog: postblogReducer 
})

const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));

export default store;
