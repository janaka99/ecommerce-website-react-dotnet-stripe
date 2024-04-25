"use client";
import React, { useState } from "react";
import { useFetchApi } from "../useFetchApi";

const useDeleteCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const deleteCategory = async (id: Number) => {
    setIsReqProcessing(true);
    try {
      const res = await useFetchApi().delete(`category/single/${id}`);
      if (res.status == 200) {
        setIsReqProcessing(false);
      } else {
        setError("error");
        setIsReqProcessing(false);
      }
    } catch (error) {
      setError("error");
      setIsReqProcessing(false);
    }
  };

  return { error, isReqProcessing, deleteCategory };
};

export default useDeleteCategory;
