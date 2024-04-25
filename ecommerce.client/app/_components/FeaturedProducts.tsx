"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [isReqProcessing, setIsReqProcessing] = useState(true);

  const getFeaturedProducts = async () => {
    try {
      setIsReqProcessing(true);
      const res = await useFetchApi().get("product/featured");
      console.log(res);
      if (res.status == 200) {
        setProducts(res.data);
        setIsReqProcessing(false);
        return;
      }
      setIsReqProcessing(false);
    } catch (error) {
      setIsReqProcessing(false);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (isReqProcessing) {
    return [1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="w-full flex flex-col gap-5">
        <div className="w-full aspect-square bg-neutral-100 animate-pulse"></div>
        <div className="h-4 w-full rounded-xl bg-neutral-100 animate-pulse"></div>
        <div className="flex justify-between items-center gap-10">
          <div className="h-4 flex-grow rounded-xl bg-neutral-100 animate-pulse"></div>
          <div className="h-4 w-10 rounded-xl bg-neutral-100 animate-pulse"></div>
        </div>
      </div>
    ));
  }

  return (
    products &&
    products.map((p: any) => (
      <div key={p.id.toString()} className="w-full flex flex-col group ">
        <div className="w-full aspect-square bg-neutral-100 p-5">
          <div className="w-full h-full overflow-hidden">
            <img
              src={p.picture}
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-200"
            />
          </div>
        </div>
        <div className="px-2 pt-2">{p.title}</div>
        <div className="flex flex-grow pb-2 px-2 justify-between items-end">
          <span className="font-bold">{p.price} $</span>

          {p.reviews && p.reviews.length > 0 && (
            <span className="text-base flex items-center gap-1">
              {p.reviews.length}
              <IoIosStar size={20} />
            </span>
          )}
        </div>
      </div>
    ))
  );
};

export default FeaturedProducts;
