"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";

import { CategoryType } from "@/types/categoryTypes";
import useGetCategories from "@/hooks/category/useGetCategories";

import Category from "./Category";

type Props = {
  categories: any;
  getAllCategories: any;
  isCategoriesLoading: any;
};

const AllCategories = ({
  categories,
  getAllCategories,
  isCategoriesLoading,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {isCategoriesLoading ? (
        <div className="text-neutral-800">Loading..</div>
      ) : (
        categories.map((category: CategoryType) => (
          <Category
            key={`${category.id}`}
            category={category}
            getCategories={getAllCategories}
          />
        ))
      )}
    </div>
  );
};

export default AllCategories;
