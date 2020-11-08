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
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_EDIT_FAILURE,
  MYPOSTS_LOADING_REQUEST,
  MYPOSTS_LOADING_SUCCESS,
  MYPOSTS_LOADING_FAILURE,
} from "../types";
import kakaoAPI from "../../kakaoAPI";

// Search Book

const searchBookAPI = (bookTitle) => {
  return kakaoAPI(bookTitle);
};

function* searchBook(action) {
  try {
    const result = yield call(searchBookAPI, action.payload);
    console.log(result, "searchBook result");
    yield put({
      type: SEARCH_BOOK_SUCCESS,
      payload: result.data.documents,
    });
  } catch (err) {
    yield put({
      type: SEARCH_BOOK_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
  } catch (err) {
    yield put({
      type: SELECT_BOOK_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
  } catch (err) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
    console.log(action.payload, "loadingPost");
    const result = yield call(loadingPostAPI, action.payload ? action.payload : "전체");
    console.log(result, "loadingPostAPI 결과 값");
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
  } catch (err) {
    yield put({
      type: POST_DETAIL_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
  } catch (err) {
    yield put({
      type: CATEGORY_LOADING_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
    if (action.payload.path !== "/") {
      yield put(push("/"));
    }
  } catch (err) {
    yield put({
      type: CATEGORY_SELECT_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
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
  try {
    const result = yield call(searchAPI, action.payload);
    console.log(result, "search 결과 값");
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/search/${action.payload}`));
  } catch (err) {
    yield put({
      type: SEARCH_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
  }
}

function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, search);
}

// delete Post

const dletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(dletePostAPI, action.payload);
    console.log(result, "DeletePost 결과 값");
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    alert('글 삭제를 완료 했습니다');
    yield put(push("/"));
  } catch (err) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

// edit Post

const editPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`api/post/${payload.postId}/edit`, payload, config);
};

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.payload);
    console.log(result, "editPost 결과 값");
    yield put({
      type: POST_EDIT_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POST_EDIT_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
  }
}

function* watchEditPost() {
  yield takeEvery(POST_EDIT_REQUEST, editPost);
}

// loading myPosts

const loadingMyPostsAPI = (payload) => {
  return axios.get(`api/post/${payload}/myPosts`);
};

function* loadingMyPosts(action) {
  try {
    const result = yield call(loadingMyPostsAPI, action.payload);
    console.log(result, "LoadingMyPosts 결과 값");
    yield put({
      type:  MYPOSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type:  MYPOSTS_LOADING_FAILURE,
      payload: {
        message: err.response.data,
        status: err.response.status,
      },
    });
    yield put(push(`/error`));
  }
}

function* watchLoadingMyPosts() {
  yield takeEvery(MYPOSTS_LOADING_REQUEST, loadingMyPosts);
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
    fork(watchDeletePost),
    fork(watchEditPost),
    fork(watchLoadingMyPosts),
  ]);
}
