"use client";
import Logo from "@/components/UI/Logo/Logo";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useLogin from "../_hooks/useLogin";
import useAuthContext from "@/hooks/useAuthContext";
import NotFound from "@/components/Layouts/NotFound/NotFound";
import Loading from "@/app/loading";

type Props = {};

const page = (props: Props) => {
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });

  const { isAuthenticated, isLoading } = useAuthContext();
  const { login, error, isReqProcessing } = useLogin();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    console.log(credentials);
    await login(credentials);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <NotFound />;
  }

  return (
    <div className="flex-grow flex justify-center items-center my-10">
      <div className="bg-neutral-100 text-neutral-800  p-8 rounded shadow-md w-full sm:max-w-[640px]">
        <div className="flex w-full flex-col gap-5 justify-between items-center mb-6">
          <Logo color="text-neutral-800" />
          <h2 className="text-4xl font-semibold ">Welcome Back</h2>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <div className="">
            <label
              htmlFor="email"
              className="block  text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.Email}
              className="text-neutral-700 w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500"
              placeholder="Your Email"
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  Email: e.target.value,
                }));
              }}
              required
              disabled={isReqProcessing}
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block  text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.Password}
              className="text-neutral-700 w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500"
              placeholder="Your Password"
              onChange={(e) => {
                setCredentials((prev) => ({
                  ...prev,
                  Password: e.target.value,
                }));
              }}
              required
              disabled={isReqProcessing}
            />
          </div>
          {isReqProcessing ? (
            <button
              disabled={isReqProcessing}
              className="bg-green-800 h-10  px-8 py-2 rounded-md hover:bg-green-600 outline-none  transition-all duration-150 mt-2 flex justify-center items-center"
            >
              <AiOutlineLoading3Quarters
                // size={25}
                className=" animate-spin text-white"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-700 text-white  px-8 py-2 rounded-md hover:bg-green-600 outline-none transition-all duration-150 mt-2"
            >
              Login
            </button>
          )}
        </form>
        <Link
          href={"/auth/register"}
          className="mt-2 text-sm underline float-right"
        >
          Not Registered?
        </Link>
      </div>
    </div>
  );
};

export default page;
