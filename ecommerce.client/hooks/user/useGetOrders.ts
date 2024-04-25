"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";

function useGetOrders() {
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const getOrders = async () => {
    setIsReqProcessing(true);
    const res = await useFetchApi().get("order");
    setIsReqProcessing(false);
    return res;
  };

  return { isReqProcessing, getOrders };
}

export default useGetOrders;
