import React from "react";
import { useFetchApi } from "../useFetchApi";

const useReviewRemove = () => {
  const removeReview = async (id: number) => {
    try {
      const res = await useFetchApi().delete(`review/single/${id}`);
      console.log(res);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { removeReview };
};

export default useReviewRemove;
