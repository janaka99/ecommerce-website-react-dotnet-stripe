"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";

function useGetCategories() {
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const getCategories = async () => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get("category");
    setIsReqProcessing(false);
    return res;
  };

  return { isReqProcessing, getCategories };
}

export default useGetCategories;
