import React, { useState } from "react";
import { useFetchApi } from "../useFetchApi";
import Product from "@/app/admin/products/_components/Product/Product";

const useAddToCart = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const addToCart = async (id: number) => {
    setIsReqProcessing(true);
    setError(null);
    const res = await useFetchApi().post("cart/add-to-cart", {
      ProductId: id,
    });

    if (res.status === 201) {
      setIsReqProcessing(false);
    } else {
      setIsReqProcessing(false);
      setError("Error");
    }
  };

  return { error, isReqProcessing, addToCart };
};

export default useAddToCart;
