"use client";
import AuthContext from "@/context/AuthContext/AuthContext";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { notFound } from "next/navigation";
import NotFound from "../NotFound/NotFound";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isLoading, isAuthenticated } = useContext(AuthContext);
    const [shouldRender, setShouldRender] = useState(true);

    if (isLoading) {
      return (
        <div className="flex-grow ">
          <div className="flex justify-center items-center absolute top-0 left-0 min-h-[100svh] w-full overflow-hidden bg-white">
            <AiOutlineLoading
              size={25}
              className="text-neutral-800 animate-spin"
            />
          </div>
        </div>
      );
    }
    if (isAuthenticated) {
      return <Component {...props} />;
    }
    // notFound();
    return <NotFound />;
  };
}
