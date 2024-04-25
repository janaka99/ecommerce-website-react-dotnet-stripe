"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import { CategoryType } from "@/types/categoryTypes";
import { ReactNode, createContext, useState } from "react";

export interface categoryContext {
  categories: CategoryType[];
  isCategoryLoading: boolean;
  // getCategories: () => Promise<void>;
}

const initialState = {
  categories: [],
  isCategoryLoading: false,
};

export const CategoryContext = createContext({} as categoryContext);

const CategoryState = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // const getCategories = async () => {
  //   setIsCategoryLoading(true);
  //   try {
  //     const res = await useFetchApi().get("category");
  //     if (res.status == 200) {
  //       setCategories(res.data);
  //       setIsCategoryLoading(false);
  //       return;
  //     } else {
  //       setCategories([]);
  //       setIsCategoryLoading(false);
  //       return;
  //     }
  //   } catch (error) {
  //     setCategories([]);
  //     setIsCategoryLoading(false);
  //     return;
  //   }
  //   setIsCategoryLoading(false);
  // };

  const getCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const res = await useFetchApi().get("category");
      if (res.status == 200) {
        setCategories(res.data);
        setIsCategoryLoading(false);
        return;
      } else {
        setCategories([]);
        setIsCategoryLoading(false);
        return;
      }
    } catch (error) {
      setCategories([]);
      setIsCategoryLoading(false);
      return;
    }
    setIsCategoryLoading(false);
  };

  return (
    <CategoryContext.Provider value={{ categories, isCategoryLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
