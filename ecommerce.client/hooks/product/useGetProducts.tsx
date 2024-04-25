"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";

function useGetProducts() {
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const getProducts = async () => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get("product");
    setIsReqProcessing(false);
    return res;
  };

  return { isReqProcessing, getProducts };
}

export default useGetProducts;
