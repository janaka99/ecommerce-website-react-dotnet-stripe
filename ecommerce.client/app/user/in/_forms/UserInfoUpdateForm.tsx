"use client";

import React, { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/UI/Button/Button";
import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import { toast } from "react-toastify";

type Props = {
  userInfo: any;
  setUserInfo: any;
};

function UserInfoUpdateForm({ userInfo, setUserInfo }: Props) {
  try {
  } catch (error) {}
  const [isUserInfoUpdating, setIsUserInfoupdating] = useState(false);

  const handleUserInfoUpdate = async (e: FormEvent) => {
    e.preventDefault();

    setIsUserInfoupdating(true);

    const form = new FormData();

    form.append("file", userInfo.file);
    const data = {
      Bio: userInfo.Bio,
      PhoneNumber: userInfo.PhoneNumber,
    };

    const jsonData = JSON.stringify(data);
    console.log(userInfo.file);
    form.append("file", userInfo.file);
    form.append("updateDetails", jsonData);

    useFetchApi()
      .put("account/update-user-info", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserInfo((prev: any) => ({
            ...prev,
            Bio: res.data.bio,
            PhoneNumber: res.data.phoneNumber,
          }));
          toast.success("Successfully updated");
          setIsUserInfoupdating(false);
          return;
        }
        toast.error("Update failed");
      })
      .catch((error) => {
        toast.error(error.response.data);
        setIsUserInfoupdating(false);
        console.log(error);
      });
  };

  return (
    <div className="w-full pb-10 border-b border-neutral-200">
      <form
        onSubmit={handleUserInfoUpdate}
        className="flex flex-col gap-8 text-neutral-800 bg-neutral-100 p-2 shadow-md  "
      >
        <div className="">
          <label
            htmlFor="username"
            className="block text- text-sm font-semibold mb-2"
          >
            Bio
          </label>
          <textarea
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
            placeholder="bio"
            defaultValue={userInfo?.Bio}
            onChange={(e) => {
              setUserInfo((prev: any) => ({
                ...prev,
                Bio: e.target.value,
              }));
            }}
            disabled={isUserInfoUpdating}
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="phonenumber"
            className="block text- text-sm font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
            placeholder="Your Phone number"
            defaultValue={userInfo?.PhoneNumber}
            onChange={(e) => {
              setUserInfo((prev: any) => ({
                ...prev,
                PhoneNumber: e.target.value,
              }));
            }}
            required
            disabled={isUserInfoUpdating}
          />
        </div>

        <div className="">
          <label
            htmlFor="password"
            className="block text- text-sm font-semibold mb-2"
          >
            Profile Image
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
            placeholder="Your Password"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setUserInfo((prev: any) => ({
                ...prev,
                file: file,
              }));
            }}
            disabled={isUserInfoUpdating}
          />
        </div>

        {isUserInfoUpdating ? (
          <Button
            disabled={isUserInfoUpdating}
            classes="h-10 flex justify-center items-center animate-pulse mt-2"
            bgColor="bg-green-900"
            textSize="text-sm"
          >
            <span className="text-sm mr-2  text-neutral-300 ">Updating</span>
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
            Update
          </Button>
        )}
      </form>
    </div>
  );
}

export default isAuth(UserInfoUpdateForm);
