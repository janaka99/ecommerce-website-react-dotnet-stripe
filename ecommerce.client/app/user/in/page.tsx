"use client";
import Logo from "@/components/UI/Logo/Logo";
import React, { useEffect, useState } from "react";

import useAuthContext from "@/hooks/useAuthContext";
import Loading from "@/components/Layouts/Loading/Loading";
import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import UserInfoUpdateForm from "./_forms/UserInfoUpdateForm";
import UserNameUpdateForm from "./_forms/UserNameUpdateForm";
import PasswordUpdateForm from "./_forms/PasswordUpdateForm";
import EmailUpdateForm from "./_forms/EmailUpdateForm";
import { SlPin } from "react-icons/sl";
import { BsArrow90DegRight } from "react-icons/bs";

function page() {
  const [userInfo, setUserInfo] = useState<any>({
    Bio: "",
    PhoneNumber: "",
    file: null,
  });
  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");

  const { user, getUserInfo } = useAuthContext();

  const [isDataFetching, setIsDataFetching] = useState(true);

  const getUserInfomation = async () => {
    setIsDataFetching(true);
    const res = await useFetchApi().get("account/profile-info");
    console.log("Profile info ", res);
    if (res.status === 200) {
      setUserInfo((prev: any) => ({
        ...prev,
        Bio: res.data.bio,
        PhoneNumber: res.data.phoneNumber,
      }));
      setUserName(res.data.userName);
      setEmail(res.data.email);
    }

    setIsDataFetching(false);
  };

  useEffect(() => {
    getUserInfomation();
  }, []);

  return (
    <div className="flex-grow flex flex-col justify-center items-center ">
      <div className="my-10 flex gap-10 max-w-[768px] w-full justify-start border-b pb-10 border-neutral-200">
        <div className="w-40 h-40">
          <img
            src={user ? user.avatar : ""}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 text-neutral-800">
          <span className="text-xl capitalize font-semibold">
            {user ? user.userName : ""}
          </span>
          <span className="text-sm capitalize font-semibold text-blue-600">
            {user ? user.role : ""}
          </span>
          <span className="text-sm capitalize">{user ? user.email : ""}</span>
          <div className="flex gap-2">
            <a
              href="/user/products"
              className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 flex gap-2 items-center text-sm uppercase"
            >
              Orders
              <BsArrow90DegRight size={14} />
            </a>
            <a
              href="/user/cart"
              className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 flex gap-2 items-center text-sm uppercase"
            >
              Cart
              <BsArrow90DegRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className=" max-w-[768px] w-full mx-auto uppercase mb-10 self-start text-xl text-neutral-800 border-b pb-10 border-neutral-200">
        Update profile
      </div>
      {isDataFetching ? (
        <div className="h-[calc(100svh-80px)]">
          <div className="animate-spin">
            <SlPin />
          </div>
        </div>
      ) : (
        <div className=" w-full flex flex-col max-w-[768px]">
          <UserInfoUpdateForm userInfo={userInfo} setUserInfo={setUserInfo} />
          <UserNameUpdateForm
            getUserInfo={getUserInfo}
            userName={userName}
            setUserName={setUserName}
          />
          <EmailUpdateForm
            getUserInfo={getUserInfo}
            email={email}
            setEmail={setEmail}
          />
          <PasswordUpdateForm getUserInfo={getUserInfo} />
        </div>
      )}
    </div>
  );
}

export default isAuth(page);
