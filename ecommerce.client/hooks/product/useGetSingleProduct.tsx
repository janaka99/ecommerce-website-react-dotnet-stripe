"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";

function useGetSingleProduct() {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const getSingleProduct = async (id: number) => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get(`product/single/${id}`);
    console.log(res.data);
    setIsReqProcessing(false);
    return res;
  };

  return { isReqProcessing, getSingleProduct };
}

export default useGetSingleProduct;
