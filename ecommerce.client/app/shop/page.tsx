import Categories from "@/components/Layouts/Categories/Categories";
import Products from "@/components/Layouts/Products/Products";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const page = () => {
  return (
    <div className="w-full py-10 flex flex-col lg:flex-row gap-10 text-neutral-800">
      <div className="flex flex-col">
        <h3 className="text-xl uppercase h-10 mb-10">Categories</h3>
        <Categories />
      </div>
      <div className="flex flex-col  w-full">
        <div className="h-10 w-full mb-10 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search..."
            className="h-full  flex-grow px-2 text-sm bg-neutral-100 text-neutral-800 outline-neutral-800 border-none focus:outline-green-600"
          />
          <button className="px-4 h-full flex justify-center items-center text-white bg-neutral-700 border-none">
            <AiOutlineSearch size={24} />
          </button>
        </div>
        <Products />
      </div>
    </div>
  );
};

export default page;
