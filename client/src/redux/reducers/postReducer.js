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
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: 0,
  loading: false,
  error: "",
  // creatorId: "",
  categoryResult: "",
  selectedCategory: "전체",
  // title: "",
  searchTerm: "",
  searchResult: "",
  searchBookTerm: "",
  searchBookResult: "",
  selectedSearchBook: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOK_REQUEST:
      return {
        ...state,
        searchBookTerm: action.payload,
        loading: true,
      };
    case SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        searchBookResult: action.payload,
        loading: false,
      };
    case SEARCH_BOOK_FAILURE:
    case SELECT_BOOK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SELECT_BOOK_REQUEST:
    case CATEGORY_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECT_BOOK_SUCCESS:
      return {
        ...state,
        selectedSearchBook: action.payload,
        loading: false,
      };
    case POST_UPLOADING_REQUEST:
    case POST_LOADING_REQUEST:
    case POST_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
      };
    case POST_UPLOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
        searchBookTerm: "",
        searchBookResult: "",
        selectedSearchBook: "",
      };
    case POST_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POST_DETAIL_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
      };
    case POST_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CATEGORY_LOADING_SUCCESS:
      return {
        ...state,
        categoryResult: action.payload,
        loading: false,
      };
    case CATEGORY_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CATEGORY_SELECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_SELECT_SUCCESS:
      return {
        ...state,
        selectedCategory: action.payload,
        // posts: action.payload.posts,
        loading: false,
      };
    case CATEGORY_SELECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
