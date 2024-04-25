import React from "react";

type Props = {
  order: any;
};

const MyOrder = ({ order }: Props) => {
  return (
    <div className="w-full flex flex-col aspect-[10/8]">
      <a
        href={`/shop/products/view?id=${order.product.id}`}
        className="w-full flex flex-col bg-neutral-700"
      >
        <div className="w-full aspect-[10/6] bg-neutral-700 overflow-hidden">
          <img
            src={order.product.picture}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-2 flex items-center mx-2 overflow-hidden text-sm">
          {order.product.title}
        </div>
      </a>
    </div>
  );
};

export default MyOrder;
