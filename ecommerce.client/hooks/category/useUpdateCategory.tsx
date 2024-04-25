import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";
import { NewCategoryType } from "../../app/admin/categories/_types/types";
import { CategoryType, UpdateCategoryType } from "@/types/categoryTypes";

const useUpdateCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const updateCategory = async (data: UpdateCategoryType) => {
    setIsReqProcessing(true);
    setError(null);
    const res = await useFetchApi().put("category/update", data);
    if (res.status === 201) {
      setIsReqProcessing(false);
    } else {
      setIsReqProcessing(false);
      setError("error");
    }
  };

  return { error, isReqProcessing, updateCategory };
};

export default useUpdateCategory;
