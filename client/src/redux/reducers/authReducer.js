import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  // user: "",
  userId: "",
  userName: "",
  errorMsg: "",
  successMsg: ""
}

const authReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userName: action.payload.user.name,
        errorMsg: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        userId: null,
        userName: null,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: action.payload.data.msg
      };
  }
}

export default authReducer;
