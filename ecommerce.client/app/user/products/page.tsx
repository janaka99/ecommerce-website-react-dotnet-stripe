"use client";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import MyOrder from "@/components/UI/MyOrder/MyOrder";
import useGetOrders from "@/hooks/user/useGetOrders";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState<any>([]);

  const { isReqProcessing, getOrders } = useGetOrders();

  const getMyOrders = async () => {
    const res = await getOrders();
    console.log(res);
    if (res.status == 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 mt-10 text-neutral-800 mb-10">
      <h1 className="text-xl  uppercase text-center w-full">My Orders</h1>
      <div className="flex flex-col gap-2 w-full pr-4">
        <div className="w-full"></div>
        <div className="text-xs flex items-center  w-full my-4 p-1">
          <div className="w-6/12">Product</div>
          <div className="w-2/12">Order Date</div>
          <div className="w-2/12">Status</div>
          <div className="w-2/12 text-right">Price $</div>
        </div>
        {products &&
          products.map((order: any) => (
            <a
              key={order.id}
              href={`/user/products/view?id=${order.product.id}`}
              className="text-xs font-semibold flex items-center w-full border-b border-neutral-200  hover:bg-neutral-100 transition-all duration-200 p-1"
            >
              <div className="w-6/12">
                <div className="flex gap-2">
                  <img
                    src={order.product.picture}
                    alt=""
                    className="w-10 h-10 bg-neutral-100 rounded-md"
                  />
                  <div className="flex-grow flex flex-col ">
                    <span className="flex-1 flex items-center justify-start text-xs font-semibold">
                      {order.product.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-2/12">
                {order.order.created_at.slice(0, 10)}
              </div>
              <div className="w-2/12 ">
                {order.status == 1 ? "Paid" : "Pending"}
              </div>
              <div className="w-2/12 text-right">{order.price}</div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default isAuth(page);
