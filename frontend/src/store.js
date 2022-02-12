import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";

const store = createStore(
  userReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));

export default store;
