import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import axios from "axios";

import {
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAILURE,
} from "../types";

import naverAPI from "../../naverAPI";

// Search Book

const searchBookAPI = (bookTitle) => {
  console.log(bookTitle, "bookTitle");
  return naverAPI(bookTitle);
};

function* searchBook(action) {
  try {
    console.log(action, "searchBookTitle");
    const result = yield call(searchBookAPI, action.payload);
    console.log(result);
    yield put({
      type: SEARCH_BOOK_SUCCESS,
      payload: result.data,
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

export default function* postSaga() {
  yield all([
    fork(watchSearchBook),
  ]);
}