import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";
import { NewCategoryType } from "../../app/admin/categories/_types/types";

const useAddReview = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const addReview = async (data: any) => {
    setIsReqProcessing(true);
    setError(null);
    try {
      const body = {
        Rating: data.Rating,
        Comment: data.Comment,
        OrderId: data.OrderId,
        ProductId: data.ProductId,
      };
      const res = await useFetchApi().post("review", body);
      console.log(res);
      if (res.status === 200) {
        setIsReqProcessing(false);
        return true;
      } else {
        setIsReqProcessing(false);
        setError("error");
        return false;
      }
    } catch (err) {
      console.log(err);
      setIsReqProcessing(false);
      setError("error");
      return false;
    }
  };

  return { error, isReqProcessing, addReview };
};

export default useAddReview;
