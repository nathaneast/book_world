import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";
import postSaga from "./postSaga";

import config from "../../config";
const { REACT_APP_BASIC_SERVER_URL } = config;

axios.defaults.baseURL = REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postSaga),
  ]);
}
