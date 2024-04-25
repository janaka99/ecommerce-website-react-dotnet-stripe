"use client";
import useGetCategories from "@/hooks/category/useGetCategories";
import useGetProducts from "@/hooks/product/useGetProducts";
import { CategoryType } from "@/types/categoryTypes";
import React, { useEffect, useState } from "react";

const Category = ({ category }: any) => {
  return (
    <button className="bg-neutral-100 text-sm py-1 px-2 lg:py-2 lg:text-start cursor-pointer lg:w-full hover:bg-neutral-200 transition-all duration-150">
      {category.name}
    </button>
  );
};

type Props = {};

const Categories = (props: Props) => {
  const [categories, setCategories] = useState<null | CategoryType[]>(null);

  const { isReqProcessing, getCategories } = useGetCategories();

  const getAllCategories = async () => {
    const res = await getCategories();
    if (res.status === 200) {
      setCategories(res.data);
    } else {
      console.log("Error getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 lg:w-56">
      {categories ? (
        categories.map((c) => (
          <Category
            key={c.id.toString()}
            setCategories={setCategories}
            category={c}
          />
        ))
      ) : (
        <>
          <div className="h-10 w-24 bg-neutral-100 lg:w-56 animate-pulse"></div>
          <div className="h-10 w-24 bg-neutral-100 lg:w-56 animate-pulse"></div>
          <div className="h-10 w-24 bg-neutral-100 lg:w-56 animate-pulse"></div>
          <div className="h-10 w-24 bg-neutral-100 lg:w-56 animate-pulse"></div>
          <div className="h-10 w-24 bg-neutral-100 lg:w-56 animate-pulse"></div>
        </>
      )}
    </div>
  );
};

export default Categories;
