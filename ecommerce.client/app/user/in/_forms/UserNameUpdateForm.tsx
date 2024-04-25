"use client";

import React, { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/UI/Button/Button";
import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import { toast } from "react-toastify";

type Props = {
  getUserInfo: () => any;
  userName: any;
  setUserName: any;
};

function UserNameUpdateForm({ getUserInfo, setUserName, userName }: Props) {
  const [isUserNameUpdating, setIsUserNameUpdating] = useState(false);

  const handleUserNameUpdate = async (e: FormEvent) => {
    e.preventDefault();

    /// DO something

    if (userName == "") {
      toast.error("Please enter username");
      return;
    }

    const data = {
      UserName: userName,
    };

    setIsUserNameUpdating(true);
    useFetchApi()
      .put("account/update-username", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully updated username");
          if (res.data.token) {
            localStorage.setItem(
              "digizone_id_RbXk8nLs3jAeZoPbQxHc",
              res.data.token
            );
          }
          getUserInfo();
          setIsUserNameUpdating(false);
          return;
        }
        toast.error("Error updating Username");
      })
      .catch((err) => {
        toast.error(err.response.data);
        setIsUserNameUpdating(false);
      });
  };

  return (
    <div className="w-full pb-10 border-b border-neutral-200">
      <form
        onSubmit={handleUserNameUpdate}
        className="flex flex-col gap-8 p-2 bg-neutral-100 text-neutral-800 mt-10"
      >
        <div className="">
          <label
            htmlFor="username"
            className="block text- text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
            placeholder="Username"
            defaultValue={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            disabled={isUserNameUpdating}
            required
          />
        </div>

        {isUserNameUpdating ? (
          <Button
            disabled={isUserNameUpdating}
            classes="h-10 flex justify-center items-center animate-pulse mt-2"
            bgColor="bg-green-900"
            textSize="text-sm"
          >
            <span className="text-sm mr-2  text-neutral-300 ">
              Updating username
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
            Update UserName
          </Button>
        )}
      </form>
    </div>
  );
}

export default isAuth(UserNameUpdateForm);
