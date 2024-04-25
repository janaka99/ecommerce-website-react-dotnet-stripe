"use client";

import React, {
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/UI/Button/Button";

import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import { toast } from "react-toastify";

type Props = {
  getUserInfo: () => any;
  email: any;
  setEmail: SetStateAction<any>;
};

function EmailUpdateForm({ getUserInfo, email, setEmail }: Props) {
  const [isUserEmailUpdating, setIsUserEmailUpdating] = useState(false);

  const handleEmailUpdate = async (e: FormEvent) => {
    e.preventDefault();

    /// DO something
    if (email == "") {
      toast.error("Please enter email");
      return;
    }

    const data = {
      Email: email,
    };
    setIsUserEmailUpdating(true);
    useFetchApi()
      .put("account/update-email", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully updated email");
          if (res.data.token) {
            localStorage.setItem(
              "digizone_id_RbXk8nLs3jAeZoPbQxHc",
              res.data.token
            );
          }

          getUserInfo();
          setIsUserEmailUpdating(false);
          return;
        }
        toast.error("Error updating Email");
      })
      .catch((error) => {
        toast.error(error.response.data);
        setIsUserEmailUpdating(false);
      });
  };

  return (
    <div className="w-full pb-10 border-b border-neutral-200">
      <form
        onSubmit={handleEmailUpdate}
        className="flex flex-col gap-8  p-2 bg-neutral-100 text-neutral-800 mt-10"
      >
        <div className="">
          <label
            htmlFor="email"
            className="block text- text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
            placeholder="Your Email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            disabled={isUserEmailUpdating}
          />
        </div>
        {isUserEmailUpdating ? (
          <Button
            disabled={isUserEmailUpdating}
            classes="h-10 flex justify-center items-center animate-pulse mt-2"
            bgColor="bg-green-900"
            textSize="text-sm"
          >
            <span className="text-sm mr-2  text-neutral-300 ">
              Update Email
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
            Update Email
          </Button>
        )}
      </form>
    </div>
  );
}

export default isAuth(EmailUpdateForm);
