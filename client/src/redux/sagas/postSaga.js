import { call, put, takeEvery, all, fork } from "redux-saga/effects";
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

const uploadingBookAPI = (post) => {
  console.log(post, "uploadingBookAPI");
  return axios.post("api/post", post);
};

function* uploadingBook(action) {
  try {
    console.log(action, "uploadingBook");
    const result = yield call(uploadingBookAPI, action.payload);
    console.log(result, "result post 값");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchUploadingBook() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadingBook);
}

export default function* postSaga() {
  yield all([fork(watchSearchBook), fork(watchSelectBook), fork(watchUploadingBook)]);
}
