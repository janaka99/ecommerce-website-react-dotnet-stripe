"use client";

import { CategoryContext } from "@/context/CategoryContext/CategoryState";
import React, { useContext } from "react";

const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("There are no category contexts available");
  }

  return context;
};

export default useCategoryContext;
