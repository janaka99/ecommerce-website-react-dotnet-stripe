"use client";
import React, { useContext, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

import { LuBoxes } from "react-icons/lu";
import { MdCategory } from "react-icons/md";

import AdminRouter from "./_components/AdminRouter";
import AuthState from "@/context/AuthContext/AuthState";
import AuthContext from "@/context/AuthContext/AuthContext";
import IsAdmin from "@/components/HOC/IsAdmin/IsAuth";

type Props = {};

const page = (props: Props) => {
  const [path, setpath] = useState("users");

  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="text-neutral-800 flex gap-4  h-[calc(100vh-96px)] mb-10 w-full">
        <div
          id="dashboard"
          className="w-56 pr-2 h-full border-r  border-r-neutral-200"
        >
          <div className="text-base uppercase mb-5 ">Admin Tools</div>
          <div className="flex flex-col gap-4 text-sm capitalize ">
            <button
              onClick={() => setpath("overview")}
              className={`${
                path == "overview" ? "bg-neutral-200" : "bg-neutral-100"
              } flex items-center gap-3   p-2 hover:bg-neutral-200 cursor-pointer transition-all duration-200`}
            >
              <BiCategoryAlt size={20} className="text-neutral-600" />
              Overview
            </button>
            <button
              onClick={() => setpath("users")}
              className={`${
                path == "users" ? "bg-neutral-200" : "bg-neutral-100"
              } flex items-center gap-3   p-2 hover:bg-neutral-200 cursor-pointer transition-all duration-200`}
            >
              <FaUsers size={20} className="text-neutral-600" />
              Users
            </button>
            <button
              onClick={() => setpath("products")}
              className={`${
                path == "products" ? "bg-neutral-200" : "bg-neutral-100"
              } flex items-center gap-3   p-2 hover:bg-neutral-200 cursor-pointer transition-all duration-200`}
            >
              <LuBoxes size={20} className="text-neutral-600" />
              Products
            </button>
            <button
              onClick={() => setpath("categories")}
              className={`${
                path == "categories" ? "bg-neutral-200" : "bg-neutral-100"
              } flex items-center gap-3  b p-2 hover:bg-neutral-200 cursor-pointer transition-all duration-200`}
            >
              <MdCategory size={20} className="text-neutral-600" />
              Categories
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-scroll ">
          <div className=" border-b border-neutral-200 w-full min-h-20 flex justify-between items-center">
            <div className="text-xl uppercase">{path}</div>
            <div className="">
              <div className="flex min-w-32 gap-2">
                <img
                  src={user ? user.avatar : ""}
                  alt=""
                  className="w-10 h-10 bg-neutral-100 rounded-md object-cover"
                />
                <div className="flex-grow flex flex-col ">
                  <span className="flex-1 flex items-center justify-start text-xs">
                    Welcome
                  </span>
                  <span className="flex-1 flex items-center justify-start text-xs font-semibold capitalize">
                    {user && user.userName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AdminRouter component={path} />
        </div>
      </div>
    </div>
  );
};

export default IsAdmin(page);
