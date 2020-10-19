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
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  // creatorId: "",
  categoryFindResult: "",
  title: "",
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
    case POST_UPLOADING_REQUEST:
    case POST_LOADING_REQUEST:
    case POST_DETAIL_REQUEST:
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
        posts: state.posts.concat(action.payload.postFindResult),
        postCount: action.payload.postCount,
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
        posts: [],
      };
    case POST_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        posts: [],
      };
    default:
      return state;
  }
}
