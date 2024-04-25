"use client";
import Logo from "@/components/UI/Logo/Logo";
import AuthContext from "@/context/AuthContext/AuthContext";
import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/UI/Button/Button";
import useAuthContext from "@/hooks/useAuthContext";
import NotFound from "@/components/Layouts/NotFound/NotFound";
import Loading from "@/components/Layouts/Loading/Loading";
import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import { toast } from "react-toastify";

type Props = {
  getUserInfo: () => any;
};

function PasswordUpdateForm({ getUserInfo }: Props) {
  const [password, setPassword] = useState({
    CurrentPassword: "",
    NewPassword: "",
  });
  const [email, setEmail] = useState("");

  const [isUserEmailUpdating, setIsUserEmailUpdating] = useState(false);
  const [isUserPassUpdating, setIsUserPassUpdating] = useState(false);

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();

    /// DO something

    if (password.NewPassword == "" || password.CurrentPassword == "") {
      toast.error("Please enter password");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordRegex.test(password.NewPassword)) {
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and a special character. It should be at least 8 characters long."
      );
      return;
    }
    if (password.NewPassword == password.CurrentPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsUserPassUpdating(true);
    useFetchApi()
      .put("account/update-password", password)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Updated Password");
          if (res.data.token) {
            localStorage.setItem(
              "digizone_id_RbXk8nLs3jAeZoPbQxHc",
              res.data.token
            );
          }
          getUserInfo();
          setIsUserPassUpdating(false);
          return;
        }
        toast.error("Error updating password");
        setIsUserPassUpdating(false);
      })
      .catch((error) => {
        toast.error(error.response.data);

        setIsUserPassUpdating(false);
      });
  };

  return (
    <form
      onSubmit={handlePasswordUpdate}
      className="flex flex-col gap-8  p-2 bg-neutral-100 text-neutral-800 mb-10 mt-10 "
    >
      <div className="">
        <label
          htmlFor="email"
          className="block text- text-sm font-semibold mb-2"
        >
          Current Password
        </label>
        <input
          type="password"
          id="current_password"
          name="current_password"
          className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
          placeholder="Your Current Password"
          value={password.CurrentPassword}
          onChange={(e) => {
            setPassword((prev) => ({
              ...prev,
              CurrentPassword: e.target.value,
            }));
          }}
          required
          disabled={isUserPassUpdating}
        />
      </div>

      <div className="">
        <label
          htmlFor="password"
          className="block text- text-sm font-semibold mb-2"
        >
          New Password
        </label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
          placeholder="New Password"
          value={password.NewPassword}
          onChange={(e) => {
            setPassword((prev) => ({
              ...prev,
              NewPassword: e.target.value,
            }));
          }}
          required
          disabled={isUserPassUpdating}
        />
      </div>

      {isUserPassUpdating ? (
        <Button
          disabled={isUserPassUpdating}
          classes="h-10 flex justify-center items-center animate-pulse mt-2"
          bgColor="bg-green-900"
          textSize="text-sm"
        >
          <span className="text-sm mr-2  text-neutral-300 ">
            Updating Password
          </span>
          <AiOutlineLoading3Quarters
            // size={25}
            className="text- animate-spin "
          />
        </Button>
      ) : (
        <Button
          btnType="submit"
          classes="h-10 flex justify-center items-center hover:bg-green-600 outline-none transition-all duration-150 mt-2"
          bgColor="bg-green-700"
          textSize="text-sm"
        >
          Update Password
        </Button>
      )}
    </form>
  );
}

export default isAuth(PasswordUpdateForm);
