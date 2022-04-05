import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./reducers/userReducer";
import postblogReducer from "./reducers/postblogReducer";
// import usersReducer from "./reducers/usersReducer";
import fullScreenReducer from "./reducers/fullScreenReducer";
import failureReducer from "./reducers/failureReducer";
import usersReducer from "./reducers/usersReducer";
import statusNotifReducer from "./reducers/statusNotifReducer";
import notificationReducer from "./reducers/notificationReducer";
import messagingReducer from "./reducers/messagingReducer";

const reducer = combineReducers({ 
  user: userReducer,
  users: usersReducer,
  postblog: postblogReducer,
  fullscreenData: fullScreenReducer,
  failure: failureReducer,
  statusNotif: statusNotifReducer,
  notifs: notificationReducer,
  messaging: messagingReducer
});

const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunk))
);
// store.subscribe(() => console.log(store.getState()));

export default store;
