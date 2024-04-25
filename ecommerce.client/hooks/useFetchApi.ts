import axios, { AxiosInstance } from "axios";

type Method = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";

// Add a request interceptor to the baseApi instance

export const useFetchApi = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

  const API_CALL = axios.create({
    baseURL: BASE_URL,
    // baseURL: "https://jsonplaceholder.typicode.com/",
  });

  API_CALL.interceptors.request.use((req) => {
    if (typeof window !== "undefined" && window) {
      // Add the Authorization header with the token from localStorage
      const token = localStorage.getItem("digizone_id_RbXk8nLs3jAeZoPbQxHc");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  });
  return API_CALL;
};
