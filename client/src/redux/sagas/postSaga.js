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
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
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
};

function* loadingPost(action) {
  try {
    console.log(action.payload, "selectCategory");
    const result = yield call(loadingPostAPI, action.payload ? action.payload : "전체");
    console.log(result, "selectCategoryAPI 결과 값");
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

function* selectCategory(action) {
  try {
    console.log(action.payload, "selectCategory");
    yield put({
      type: CATEGORY_SELECT_SUCCESS,
      payload: action.payload.targetCategory,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_SELECT_FAILURE,
      payload: e.response,
    });
  } finally {
    if (action.payload.path !== "/") {
      yield put(push("/"));
    }
  }
}

function* watchSelectCategory() {
  yield takeEvery(CATEGORY_SELECT_REQUEST, selectCategory);
}

// Search 

const searchAPI = (payload) => {
  return axios.get(`api/search/${payload}`);
};

function* search(action) {
  console.log('search postSaga 실행');
  try {
    const result = yield call(searchAPI, action.payload);
    console.log(result, "search 결과 값");
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/search/${action.payload}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e.response,
    });
    yield put(push("/"));
  }
}

function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, search);
}

// post Delete

const postDeleteAPI = (payload) => {
  return axios.get(`api/post/Delete/${payload}`);
};

function* postDelete(action) {
  try {
    const result = yield call(postDeleteAPI, action.payload);
    console.log(result, "postDelete 결과 값");
    yield put({
      type: postDelete_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/postDelete/${action.payload}`));
  } catch (e) {
    yield put({
      type: postDelete_FAILURE,
      payload: e.response,
    });
    yield put(push("/"));
  }
}

function* watchPostDelete() {
  yield takeEvery(POST_DELETE_REQUEST, postDelete);
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
    fork(watchSearch),
    fork(watchPostDelete),
  ]);
}
