"use client";
import useAddToCart from "@/hooks/cart/useAddToCart";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

type Props = {
  product: any;
};

// 70 words

const Product = ({ product }: Props) => {
  const { error, isReqProcessing, addToCart } = useAddToCart();
  const router = useRouter();
  const handleDelete = async (id: Number) => {
    try {
      // const
    } catch (error) {
      console.log("Error");
    }
  };

  const handleProductBuy = async () => {
    await addToCart(product.id);
    if (error) {
      console.log("Product Add Failed");
    } else {
      console.log("Product added successfully");
      router.push("/user/cart");
    }
  };

  return (
    <div className="w-full flex flex-col aspect-[10/12] bg-neutral-100 border border-neutral-100 hover:border-green-600 group relative">
      <div className="w-full aspect-square  p-2 overflow-hidden ">
        <div className="w-full h-full overflow-hidden">
          <img
            src={product.picture}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex-1 py-1 flex items-center px-2 overflow-hidden text-sm">
        {product.title}
      </div>

      <div className="text-sm flex justify-between px-2 pb-2">
        <span>{product.price} $</span>
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-2   rounded-md">
        <div className="text-white flex items-center gap-2">
          <a
            className="bg-neutral-900 p-2"
            href={`/admin/products/update/edit?id=${product.id}`}
          >
            <CiEdit size={20} className="hover:text-green-400 " />
          </a>
          <button
            className="bg-neutral-900 p-2"
            onClick={() => handleDelete(12)}
          >
            <MdDelete size={20} className="hover:text-red-400 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
