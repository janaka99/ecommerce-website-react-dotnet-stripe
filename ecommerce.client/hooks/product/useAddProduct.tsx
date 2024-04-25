import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";
import { NewCategoryType } from "../../app/admin/categories/_types/types";

const useAddProduct = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const addProduct = async (data: FormData) => {
    setIsReqProcessing(true);
    setError(null);
    try {
      const res = await useFetchApi().post("product/add-new", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        setIsReqProcessing(false);
      } else {
        setIsReqProcessing(false);
        setError("error");
      }
    } catch (err) {
      console.log(err);
      setIsReqProcessing(false);
      setError("error");
    }
  };

  return { error, isReqProcessing, addProduct };
};

export default useAddProduct;
