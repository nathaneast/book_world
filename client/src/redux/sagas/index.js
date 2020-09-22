import { all, fork } from "redux-saga/effects";
import axios from "axios";

import authSaga from "./authSaga";

import dotenv from "dotenv";
dotenv.config();

axios.default.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
