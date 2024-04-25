"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SkelatonAdmin from "./SkelatonAdmin";

type Props = {};

const Categories = (props: Props) => {
  const [Categories, setCategories] = useState<any>(null);

  const getData = async () => {
    const res = await useFetchApi().get("category");
    console.log(res);
    if (res.status == 200) {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return Categories == null ? (
    <SkelatonAdmin />
  ) : (
    <div className="flex flex-col gap-2 w-full pr-4">
      <div className="w-full"></div>
      <div className="text-xs flex items-center  w-full my-4">
        <div className="w-11/12">Name</div>

        <div className="w-1/12"></div>
      </div>
      {Categories.map((i: any) => (
        <div
          key={i.id}
          className="text-xs font-semibold flex items-center w-full border-b border-neutral-200 pb-2"
        >
          <div className="w-11/12 flex items-center justify-start text-xs font-semibold">
            {i.name}
          </div>
          <button className="cursor-pointer w-1/12 flex justify-end">
            <HiOutlineDotsHorizontal size={25} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
