import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
} from "../types";

const initialState = {
  comments: [],
  loading: false,
  error: "",
};

const commentReduer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
      return {
        ...state,
        comments: [],
        loading: true,
      };
    case COMMENT_LOADING_SUCCESS:
      return {
        ...state,
       comments: action.payload,
      };
    case COMMENT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case COMMENT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_UPLOADING_SUCCESS:
      return {
        ...state,
       comments: [...state.comments, action.payload],
      };
    case COMMENT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReduer;
