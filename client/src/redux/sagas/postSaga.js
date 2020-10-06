import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import axios from "axios";

import {
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAILURE,
} from "../types";

import naverAPI from "../../naverAPI";

const kakao = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search/book?target=title&query=",
  headers: {'Authorization': 'KakaoAK '+ "960c9d15fc13f8aef6af922c259310a1"}
});

// Search Book

const searchBookAPI = (bookTitle) => {
  console.log(bookTitle, "bookTitle");
  // return axios.get("https://api.coinpaprika.com/v1/tickers")
  // return naverAPI(bookTitle);
  return kakao.get(`${bookTitle}`)
};

function* searchBook(action) {
  try {
    console.log(action, "searchBookTitle");
    const result = yield call(searchBookAPI, action.payload);
    console.log(result,"result");
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
