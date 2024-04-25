"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";

function useGetSingleOrder() {
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const getSingleOrder = async (id: any) => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get(`order/single/${id}`);
    setIsReqProcessing(false);
    return res;
  };

  return { isReqProcessing, getSingleOrder };
}

export default useGetSingleOrder;
