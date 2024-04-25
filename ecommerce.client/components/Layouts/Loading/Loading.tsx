import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex-grow ">
      <div className="flex justify-center items-center absolute top-0 left-0 min-h-[100svh] w-full overflow-hidden bg-white">
        <AiOutlineLoading size={25} className="text-neutral-800 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
