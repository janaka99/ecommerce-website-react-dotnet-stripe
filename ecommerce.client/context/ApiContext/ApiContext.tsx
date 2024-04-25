"use client";
import axios, { AxiosInstance } from "axios";
import React, { createContext } from "react";

type Props = {
  children: React.ReactNode;
};

type ApiContextType = {
  baseApi: AxiosInstance;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

function ApiContextProvider({ children }: Props) {
  const BASE_URL = "https://api.example.com";
  const baseApi = axios.create({
    baseURL: BASE_URL,
  });

  const contextValue: ApiContextType = {
    baseApi,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}

export { ApiContext, ApiContextProvider };
