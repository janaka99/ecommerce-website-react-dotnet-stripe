"use client";

import React, {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import authReducer from "./AuthReducer";
import AuthContext from "./AuthContext";
import {
  LOGIN_CALL,
  LOGOUT_CALL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "./AuthActions";
import { useFetchApi } from "@/hooks/useFetchApi";
import { AuthStateType } from "./types";

type Props = {
  children: ReactNode;
};

const AuthState = (props: Props) => {
  const initialState = {
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  };

  const [state, dispatch] = useReducer(
    authReducer,
    initialState as AuthStateType
  );

  const getUserInfo = async () => {
    try {
      useFetchApi()
        .get("account/user-details")
        .then((res) => {
          console.log(res);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.loggedUser,
          });
        })
        .catch((error) => {
          console.log(error.response);
          dispatch({
            type: LOGIN_FAILED,
            payload: error,
          });
        });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: null,
      });
    }
  };

  const logout = async () => {
    try {
      dispatch({
        type: "LOGOUT_CALL",
        payload: null,
      });
      localStorage.removeItem("digizone_id_RbXk8nLs3jAeZoPbQxHc");
      // Reset the state to the initial state

      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: null,
      });
    } catch (error) {
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: null,
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, logout, getUserInfo, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
