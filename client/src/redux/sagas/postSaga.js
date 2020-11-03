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
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_DETAIL_FAILURE,
  CATEGORY_LOADING_REQUEST,
  CATEGORY_LOADING_SUCCESS,
  CATEGORY_LOADING_FAILURE,
  CATEGORY_SELECT_REQUEST,
  CATEGORY_SELECT_SUCCESS,
  CATEGORY_SELECT_FAILURE,
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

// Uploading Post

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

// Loading Post

const loadingPostAPI = (payload) => {
  return axios.get(`/api/post/skip/${payload}`);
  // return axios.get(`/api/category/${payload}`);
};

function* loadingPost(action) {

  try {
    console.log(action, "loadingPost");
    const result = yield call(loadingPostAPI, action.payload);
    console.log(result, "loadingPost 결과 값");
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoadingPost() {
  yield takeEvery(POST_LOADING_REQUEST, loadingPost);
}

// post Detail

const loadPostDetailAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* postDetail(action) {
  try {
    console.log(action.payload, "postDetail action");
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "postDetail 결과 값");
    yield put({
      type: POST_DETAIL_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_DETAIL_FAILURE,
      payload: e.response,
    });
    yield put(push("/"));
  }
}

function* watchPostDetail() {
  yield takeEvery(POST_DETAIL_REQUEST, postDetail);
}

// Category Loading

const loadingCategoryAPI = () => {
  return axios.get("api/category");
};

function* loadingCategory() {
  try {
    const result = yield call(loadingCategoryAPI);
    console.log(result, "loadingCategory 결과 값");
    yield put({
      type: CATEGORY_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoadingCategory() {
  yield takeEvery(CATEGORY_LOADING_REQUEST, loadingCategory);
}

// Category Select

const selectCategoryAPI = (categoryName) => {
  return axios.get(`api/category/${categoryName}`);
};

function* selectCategory(action) {
  try {
    console.log(action.payload, "selectCategory");
    const result = yield call(selectCategoryAPI, action.payload);
    console.log(result, "selectCategoryAPI 결과 값");
    const payload = {
<<<<<<< HEAD
      selectedCategory: action.payload,
      posts: result.data
    };
    yield put({
      type: CATEGORY_SELECT_SUCCESS,
      payload
    });
    yield put(push("/"));
=======
      posts: result.data,
      selectedCategory: action.payload,
    };
    yield put({
      type: CATEGORY_SELECT_SUCCESS,
      payload,
    });
>>>>>>> 8806e0e30bc9bc2c4e5ad77eb68d9f539fa97723
  } catch (e) {
    yield put({
      type: CATEGORY_SELECT_FAILURE,
      payload: e.response,
    });
<<<<<<< HEAD
    yield put(push("/"));
=======
>>>>>>> 8806e0e30bc9bc2c4e5ad77eb68d9f539fa97723
  }
}

function* watchSelectCategory() {
  yield takeEvery(CATEGORY_SELECT_REQUEST, selectCategory);
}

export default function* postSaga() {
  yield all([
    fork(watchSearchBook),
    fork(watchSelectBook),
    fork(watchUploadingPost),
    fork(watchLoadingPost),
    fork(watchPostDetail),
    fork(watchLoadingCategory),
    fork(watchSelectCategory),
  ]);
}
