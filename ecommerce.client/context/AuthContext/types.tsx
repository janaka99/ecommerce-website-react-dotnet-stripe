import React from "react";

export type User = {
  email: string;
  role: string;
  userName: string;
  avatar: string;
};

export type Credentials = {
  Email: string;
  Password: string;
};

export type RegisterForm = {
  Email: string;
  Password: string;
  UserName: string;
};

export type LoginFormType = {
  Email: string;
  Password: string;
};

export interface AuthStateType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  dispatch: React.Dispatch<AuthActionType>;
  // login: () => void;
}

export type AuthActionType = {
  type: string;
  payload: any;
};
