import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import axios from "axios";

import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
} from "../types";

// Comment load

const loadCommentAPI = (payload) => {
  return axios.get(`/api/post/${payload}/comment`);
};

function* loadComment(action) {
  try {
    console.log('댓글 불러오기 페이로드',action.payload);
    const result = yield call(loadCommentAPI, action.payload);
    console.log("loadComment", result);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoadComment() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComment);
}

// Comment Upload

const uploadCommentAPI = (payload) => {
  return axios.post(`/api/post/${payload.postId}/comment`, payload);
};

function* uploadComment(action) {
  console.log('업로딩코멘트 페이로드',action.payload)
  try {
    const result = yield call(uploadCommentAPI, action.payload);
    console.log("uploadComment", result);
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchUploadComment() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchUploadComment),
    fork(watchLoadComment),
  ]);
}
