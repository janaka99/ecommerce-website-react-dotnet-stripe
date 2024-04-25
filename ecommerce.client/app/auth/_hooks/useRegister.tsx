"use client";

import { RegisterForm } from "@/context/AuthContext/types";
import useAuthContext from "@/hooks/useAuthContext";
import { useFetchApi } from "@/hooks/useFetchApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useRegister = () => {
  const [error, setError] = useState<null | string>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const register = async (data: RegisterForm) => {
    setError(null);
    try {
      if (data.UserName == "" || data.Email == "" || data.Password == "") {
        toast.error("Please fill the form");

        return;
      }

      if (data.Password.length <= 8) {
        toast.error("Password must be at least 8 characters long");

        return;
      }
      setIsReqProcessing(true);
      await useFetchApi()
        .post("account/register", data)
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
            toast.success("Successfully registered");
            setIsReqProcessing(false);
          } else {
            dispatch({
              type: "LOGIN_FAILED",
              payload: null,
            });

            setIsReqProcessing(false);
          }
        })
        .catch((err) => {
          dispatch({
            type: "LOGIN_FAILED",
            payload: null,
          });
          toast.error(err.response.data);
          setIsReqProcessing(false);
        });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILED",
        payload: null,
      });
      toast.error("Registration failed");
      setIsReqProcessing(false);
    }
  };

  return { register, isReqProcessing, error };
};

export default useRegister;
