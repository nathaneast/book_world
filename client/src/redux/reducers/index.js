import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import commentReduer from "./commentReduer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
    comment: commentReduer,
  });

export default createRootReducer;
