import {
  LOGIN_CALL,
  LOGOUT_CALL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./AuthActions";
import { AuthActionType, AuthStateType } from "./types";

const authReducer = (state: AuthStateType, action: AuthActionType) => {
  switch (action.type) {
    case LOGIN_CALL:
    case LOGOUT_CALL:
      return {
        ...state,
        user: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_FAILED:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    default:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
  }
};

export default authReducer;
