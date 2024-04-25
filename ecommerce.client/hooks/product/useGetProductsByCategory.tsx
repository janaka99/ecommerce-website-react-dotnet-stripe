"use client";

import React, { useState } from "react";
import { useFetchApi } from "../useFetchApi";

const useGetProductsByCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);
  const [products, setProducts] = useState(null);

  const getProductsByCategory = async (categoryId: number) => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get(`product/search/${categoryId}`);
    if (res.status == 200) {
      setIsReqProcessing(false);
      setProducts(res.data);
      return res.data;
    } else {
      setError("error");
      setIsReqProcessing(false);
      return error;
    }
  };

  return { error, isReqProcessing, getProductsByCategory, products };
};

export default useGetProductsByCategory;
