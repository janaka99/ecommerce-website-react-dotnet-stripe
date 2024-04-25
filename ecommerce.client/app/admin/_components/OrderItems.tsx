"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SkelatonAdmin from "./SkelatonAdmin";

type Props = {};

const OrderItems = (props: Props) => {
  const [OrderItems, setOrderItems] = useState<any>(null);

  const getData = async () => {
    const res = await useFetchApi().get("order/all");
    console.log(res);
    if (res.status == 200) {
      setOrderItems(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return OrderItems == null ? (
    <SkelatonAdmin />
  ) : (
    <div className="flex flex-col gap-2 w-full pr-4">
      <div className="w-full"></div>
      <div className="text-xs flex items-center  w-full my-4">
        <div className="w-4/12">Product</div>
        <div className="w-3/12">Email</div>
        <div className="w-2/12">Order Date</div>
        <div className="w-1/12">Status</div>
        <div className="w-1/12">Price $</div>
        <div className="w-1/12"></div>
      </div>
      {OrderItems.map((i: any) => (
        <div
          key={i.orderId}
          className="text-xs font-semibold flex items-center w-full border-b border-neutral-200 pb-2"
        >
          <div className="w-4/12">
            <div className="flex gap-2">
              <img
                src={i.productPicture}
                alt=""
                className="w-10 h-10 bg-neutral-100 rounded-md"
              />
              <div className="flex-grow flex flex-col ">
                <span className="flex-1 flex items-center justify-start text-xs font-semibold">
                  {i.productName}
                </span>
              </div>
            </div>
          </div>
          <div className="w-3/12">{i.email}</div>
          <div className="w-2/12">{i.orderDate.slice(0, 10)}</div>
          <div className="w-1/12">
            {i.paymentStatus == 1 ? "Paid" : "Pending"}
          </div>
          <div className="w-1/12">{i.price}</div>
          <button className="cursor-pointer w-1/12 flex justify-end">
            <HiOutlineDotsHorizontal size={25} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
