"use client";

import { LoginFormType } from "@/context/AuthContext/types";
import useAuthContext from "@/hooks/useAuthContext";
import { useFetchApi } from "@/hooks/useFetchApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const login = async (data: LoginFormType) => {
    setIsReqProcessing(true);
    setError(null);
    try {
      if (data.Password == "" || data.Email == "") {
        setError("Please fill the form");
        setIsReqProcessing(false);
        return;
      }
      await useFetchApi()
        .post("account/login", data)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem(
              "digizone_id_RbXk8nLs3jAeZoPbQxHc",
              res.data.token
            );
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: res.data.LoggedUser,
            });
            router.push("/");
            toast.error("Successfully logged In");
            setIsReqProcessing(false);
          } else {
            dispatch({
              type: "LOGIN_FAILED",
              payload: null,
            });

            setIsReqProcessing(false);
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: "LOGIN_FAILED",
            payload: error,
          });
          toast.error(error.response.data);
          setIsReqProcessing(false);
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAILED",
        payload: null,
      });
      toast.error("Login Failed");
      setIsReqProcessing(false);
    }
  };

  return { login, isReqProcessing, error };
};

export default useLogin;
