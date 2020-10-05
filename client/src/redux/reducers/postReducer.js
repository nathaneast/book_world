import {
SEARCH_BOOK_REQUEST,
SEARCH_BOOK_SUCCESS,
SEARCH_BOOK_FAILURE,
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
  // searchBookTerm: "",
  searchBookResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOK_REQUEST:
      return {
        ...state,
        // searchBookTerm: action.payload,
        loading: true,
      };
    case SEARCH_BOOK_SUCCESS:
      return {
        ...state,
        // searchBookTerm: "",
        searchBookResult: action.payload,
        loading: false,
      };
    case SEARCH_BOOK_FAILURE:
      return {
        ...state,
        // searchBook: "",
        error: action.payload,
        loading: false,
      };
      default:
        return state;
  }
}
