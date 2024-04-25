import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useState } from "react";
import { NewCategoryType } from "../../app/admin/categories/_types/types";

const useUpdateReview = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const updateReview = async (data: any) => {
    setIsReqProcessing(true);
    setError(null);
    try {
      const body = {
        ReviewId: data.Id,
        Rating: data.Rating,
        Comment: data.Comment,
      };
      const res = await useFetchApi().put("review", body);
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

  return { error, isReqProcessing, updateReview };
};

export default useUpdateReview;
