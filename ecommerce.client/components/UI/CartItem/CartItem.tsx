"use client";
import useRemoveFromCart from "@/hooks/cart/useRemoveFromCart";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

type Props = {};

const CartItem = ({ cartItem, getCart }: any) => {
  const { error, isReqProcessing, removeFromCart } = useRemoveFromCart();
  const [removeData, setremoveData] = useState<RemoveDataType>({
    cartId: cartItem.cartId,
    productId: cartItem.productId,
  });
  console.log(cartItem);
  const handleRemove = async () => {
    await removeFromCart(removeData);
    if (error) {
      console.log("error");
    } else {
      console.log("Object removed successfully");
      alert("Object removed successfully");
      getCart();
    }
  };

  return (
    <div className="w-full flex  text-neutral-800 pb-4 border-b border-neutral-200 gap-8 relative">
      <div className="w-28 h-28  bg-gray-100">
        <img
          src={cartItem.product.picture}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <button className="absolute top-0 right-0 z-50" onClick={handleRemove}>
          <MdDelete size={20} className="text-red-400 hover:text-red-500" />
        </button>
        <div className="text-lg uppercase mr-10">{cartItem.product.title}</div>
        <div className="text-lg font-semibold flex gap-3 self-end">
          <span className="font-normal">$</span>
          {cartItem.product.price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
