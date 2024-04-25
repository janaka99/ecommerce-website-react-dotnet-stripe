"use client";

import React, { FormEvent, useContext, useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import NotFound from "@/components/Layouts/NotFound/NotFound";
import Loading from "@/components/Layouts/Loading/Loading";
import AllCategories from "./_components/AllCategories";
import AddNewCategory from "./_components/AddNewCategory";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import useGetCategories from "@/hooks/category/useGetCategories";

type Props = {};

function page({}: Props) {
  const { getCategories } = useGetCategories();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [isCategoriesLoading, setisCategoriesLoading] = useState(true);

  const getAllCategories = async () => {
    const res = await getCategories();
    if (res.status == 200) {
      setCategories(res.data);
      setisCategoriesLoading(false);
    }
  };

  const loadCategories = async () => {
    setisCategoriesLoading(true);
    await getAllCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="flex-grow flex justify-center items-center flex-col ">
      <div className="bg-neutral-100 text-neutral-800  p-8 rounded shadow-md w-full max-w-[676px]">
        <h2 className="text-xl uppercase font-semibold mb-8">
          Add new Category
        </h2>
        <AddNewCategory getCategories={getAllCategories} />
      </div>
      <div className="bg-neutral-100  p-8  w-full max-w-[676px] mt-10">
        <h2 className="text-xl uppercase font-semibold mb-8 text-neutral-800">
          Existing Categories
        </h2>
        <div className="">
          <AllCategories
            categories={categories}
            getAllCategories={getAllCategories}
            isCategoriesLoading={isCategoriesLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default isAuth(page);
