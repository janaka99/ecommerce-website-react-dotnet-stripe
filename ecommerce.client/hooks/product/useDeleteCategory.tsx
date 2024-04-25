import React from "react";
import { useFetchApi } from "../useFetchApi";

const useDeleteCategory = async (id: Number) => {
  try {
    const res = await useFetchApi().delete(`category/single/${id}`);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default useDeleteCategory;
