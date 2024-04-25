import React, { useState } from "react";
import { useFetchApi } from "../useFetchApi";
import Product from "@/app/admin/products/_components/Product/Product";

const useRemoveFromCart = () => {
  const [error, setError] = useState<string | null>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const removeFromCart = async (data: RemoveDataType) => {
    setIsReqProcessing(true);
    setError(null);
    const res = await useFetchApi().delete(
      `cart/remove-from-cart/${data.cartId}/${data.productId}`
    );

    if (res.status === 202) {
      setIsReqProcessing(false);
    } else {
      setIsReqProcessing(false);
      setError("Error");
    }
  };

  return { error, isReqProcessing, removeFromCart };
};

export default useRemoveFromCart;
