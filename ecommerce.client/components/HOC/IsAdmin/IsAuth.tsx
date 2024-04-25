"use client";
import AuthContext from "@/context/AuthContext/AuthContext";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { notFound } from "next/navigation";
import NotFound from "@/components/Layouts/NotFound/NotFound";

export default function IsAdmin(Component: any) {
  return function IsAdmin(props: any) {
    const { isLoading, user, isAuthenticated } = useContext(AuthContext);
    const [shouldRender, setShouldRender] = useState(true);

    if (isLoading) {
      return (
        <div className="flex-grow ">
          <div className="flex justify-center items-center absolute top-0 left-0 h-[100svh] w-full overflow-hidden">
            <AiOutlineLoading
              size={25}
              className="text-neutral-800 animate-spin"
            />
          </div>
        </div>
      );
    }
    if (isAuthenticated && user && user.role === "admin") {
      return <Component {...props} />;
    }
    // notFound();
    return <NotFound />;
  };
}
