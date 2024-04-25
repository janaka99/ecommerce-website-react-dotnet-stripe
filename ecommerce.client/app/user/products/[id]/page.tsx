"use client";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import useAddToCart from "@/hooks/cart/useAddToCart";
import useGetSingleOrder from "@/hooks/user/useGetSingleOrder";

import { Rating } from "primereact/rating";

import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import useAddReview from "@/hooks/review/useAddReview";
import Review from "@/components/Layouts/Review/Review";
import ReviewForm from "@/components/Layouts/ReviewForm/ReviewForm";
import NotFound from "@/components/Layouts/NotFound/NotFound";

const page = (props: any) => {
  const {
    isReqProcessing,

    getSingleOrder,
  } = useGetSingleOrder();

  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [review, setReview] = useState<any>();

  const getProduct = async () => {
    const res = await getSingleOrder(props.searchParams.id);
    console.log(res);
    if (res.status === 200) {
      setOrder(res.data.order);
      setReview(res.data.review);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isReqProcessing) {
    return <div>Loading...</div>;
  }

  if (order == null) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-14 my-6 text-neutral-800">
      <div className="w-full  flex flex-col-reverse md:flex-row md:justify-between gap-4 md:gap-10">
        <div className="w-full md:max-w-[400px] h-[40vh] p-4 bg-neutral-100">
          <img
            src={order?.product.picture}
            alt=""
            className="w-full max-w-[400px] object-cover h-full"
          />
        </div>
        <div className="flex-grow flex flex-col gap-4 justify-start ">
          <div className="text-3xl md:text-5xl ">{order?.product.title}</div>
          <div className="text-xl text-neutral-800 font-bold">
            {order?.product.Category?.name}
          </div>
          <div className="text-neutral-500">{order?.product.description}</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-10">
        <h1 className="text-xl uppercase">
          {order && order.review != null
            ? "Your Feedback"
            : "What do you say about the product"}
        </h1>
        {order && (
          <ReviewForm productId={order?.productId} orderId={order?.orderId} />
        )}
      </div>
    </div>
  );
};

export default isAuth(page);
