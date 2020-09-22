import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import axios from "axios";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../types";

const loginUserAPI = () => {
  return axios.get("api/google");
};

function* loginUser() {
  try {
    const result = yield call(loginUserAPI);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser)]);
}
