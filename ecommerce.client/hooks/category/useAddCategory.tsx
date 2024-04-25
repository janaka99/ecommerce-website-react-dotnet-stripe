import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";
import { NewCategoryType } from "../../app/admin/categories/_types/types";

const useAddCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const addcategory = async (data: NewCategoryType) => {
    setIsReqProcessing(true);
    setError(null);
    const res = await useFetchApi().post("category/add-new", data);
    if (res.status === 201) {
      setIsReqProcessing(false);
    } else {
      setIsReqProcessing(false);
      setError("error");
    }
  };

  return { error, isReqProcessing, addcategory };
};

export default useAddCategory;
