"use client";
import Logo from "@/components/UI/Logo/Logo";
import AuthContext from "@/context/AuthContext/AuthContext";
import Link from "next/link";
import React, { FormEvent, useContext, useState } from "react";
import useRegister from "../_hooks/useRegister";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/UI/Button/Button";
import useAuthContext from "@/hooks/useAuthContext";
import NotFound from "@/components/Layouts/NotFound/NotFound";
import Loading from "@/components/Layouts/Loading/Loading";

type Props = {};

function page({}: Props) {
  const { register, error, isReqProcessing } = useRegister();

  const { isAuthenticated, isLoading } = useAuthContext();
  const [form, setform] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    await register(form);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <NotFound />;
  }

  return (
    <div className="flex-grow flex justify-center items-center  mb-10">
      <div className="bg-neutral-100 text-neutral-800  p-8 rounded shadow-md w-full max-w-[420px]">
        <div className="flex w-full flex-col gap-5 justify-between items-center mb-6">
          <Logo color="text-neutral-800" />
          <h2 className="text-4xl font-semibold ">Welcome!</h2>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-8">
          <div className="">
            <label
              htmlFor="username"
              className="block  text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500"
              placeholder="Username"
              value={form.UserName}
              onChange={(e) => {
                setform((prev) => ({
                  ...prev,
                  UserName: e.target.value,
                }));
              }}
              disabled={isReqProcessing}
              required
            />
          </div>
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
              name="email"
              className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500"
              placeholder="Your Email"
              value={form.Email}
              onChange={(e) => {
                setform((prev) => ({
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
              className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-black"
              placeholder="Your Password"
              value={form.Password}
              onChange={(e) => {
                setform((prev) => ({
                  ...prev,
                  Password: e.target.value,
                }));
              }}
              required
              disabled={isReqProcessing}
            />
          </div>

          {isReqProcessing ? (
            <Button
              disabled={isReqProcessing}
              classes="h-10 flex justify-center items-center animate-pulse mt-2"
              bgColor="bg-green-900"
              textSize="text-sm"
            >
              <span className="text-sm mr-2  text-neutral-300 ">
                Registering
              </span>
              <AiOutlineLoading3Quarters
                // size={25}
                className="text-white animate-spin "
              />
            </Button>
          ) : (
            <Button
              btnType="submit"
              classes="h-10 flex justify-center items-center hover:bg-green-600 outline-none transition-all duration-150 mt-2"
              bgColor="bg-green-700"
              textSize="text-sm"
            >
              Register
            </Button>
          )}
        </form>
        <Link
          href={"/auth/login"}
          className="mt-2 text-sm underline float-right"
        >
          Already Registered?
        </Link>
      </div>
    </div>
  );
}

export default page;
