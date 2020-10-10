import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";
import {
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAILURE,
  SELECT_BOOK_REQUEST,
  SELECT_BOOK_SUCCESS,
  SELECT_BOOK_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
} from "../types";
import kakaoAPI from "../../kakaoAPI";

// Search Book

const searchBookAPI = (bookTitle) => {
  console.log(bookTitle, "bookTitle");
  return kakaoAPI(bookTitle);
};

function* searchBook(action) {
  try {
    console.log(action, "searchBookTitle");
    const result = yield call(searchBookAPI, action.payload);
    console.log(result, "result");
    yield put({
      type: SEARCH_BOOK_SUCCESS,
      payload: result.data.documents,
    });
  } catch (e) {
    yield put({
      type: SEARCH_BOOK_FAILURE,
      payload: e.response,
    });
  }
}

function* watchSearchBook() {
  yield takeEvery(SEARCH_BOOK_REQUEST, searchBook);
}

// Select Book

function* selectBook(action) {
  try {
    yield put({
      type: SELECT_BOOK_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: SELECT_BOOK_FAILURE,
      payload: e.response,
    });
  }
}

function* watchSelectBook() {
  yield takeEvery(SELECT_BOOK_REQUEST, selectBook);
}

// Uploading Book

const uploadingPostAPI = (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = body.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(body, "uploadingPostAPI body");
  return axios.post("api/post", body, config);
};

function* uploadingPost(action) {
  try {
    console.log(action, "uploadingPost");
    const result = yield call(uploadingPostAPI, action.payload);
    console.log(result, "result post 값");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e.response,
    });
    yield put(push("/"));
  }
}

function* watchUploadingPost() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadingPost);
}

export default function* postSaga() {
  yield all([fork(watchSearchBook), fork(watchSelectBook), fork(watchUploadingPost)]);
}
