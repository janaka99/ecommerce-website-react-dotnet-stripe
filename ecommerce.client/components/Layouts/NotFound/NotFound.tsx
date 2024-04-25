import BtnLink from "@/components/UI/BtnLink/BtnLink";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="flex min-h-60 justify-center items-center w-full">
        <div className="flex flex-col gap-5 text-neutral-800 justify-center">
          <div className="flex items-center gap-5  justify-center">
            <span className="text-2xl">404</span>
            <div className="h-12 w-[1px] bg-neutral-500"></div>
            <span className="text-sm font-normal">
              This page Could not be found
            </span>
          </div>
          <span className="text-sm font-normal">
            Maybe you don't have permission to see this page
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
