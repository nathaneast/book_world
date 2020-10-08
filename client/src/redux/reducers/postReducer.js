import {
  SEARCH_BOOK_REQUEST,
  SEARCH_BOOK_SUCCESS,
  SEARCH_BOOK_FAILURE,
  SELECT_BOOK_REQUEST,
  SELECT_BOOK_SUCCESS,
  SELECT_BOOK_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
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
        // selectedSearchBook: action.payload,
        loading: false,
      };
    case POST_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
