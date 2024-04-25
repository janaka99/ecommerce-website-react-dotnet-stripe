"use client";

import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import CartItem from "@/components/UI/CartItem/CartItem";
import { useFetchApi } from "@/hooks/useFetchApi";
import { useEffect, useState } from "react";
import Stripe from "stripe";

type Props = {};

const page = (props: Props) => {
  const [cart, setCart] = useState<any>(null);

  const calTotal = (cart: any) => {
    let total = 0;

    for (let c of cart) {
      total = total + c.product.price;
    }
    console.log(total);
    return total;
  };

  const getCart = async () => {
    const res = await useFetchApi().get("cart");

    if (res.status === 200) {
      setCart(res.data);
    }
  };

  const handleProductBuy = async () => {
    const res = await useFetchApi().post("order/single/add-new-order", {
      CartId: cart.id,
    });
    if (res.status === 200) {
      const url = res.data.stUrl;
      console.log("URL FOUND ", url);
      window.location.href = url;
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cart ? (
        <div className="max-w-[720px] w-full mx-auto flex flex-col ">
          {cart.cartItems.length > 0 ? (
            <>
              <div className="mb-20 text-xl text-neutral-800 uppercase font-bold text-center mt-20">
                shopping Cart
              </div>
              <div className=" w-full mx-auto flex flex-col  gap-4 ">
                {cart.cartItems.map((c: any) => (
                  <CartItem
                    cartItem={c}
                    key={c.id.toString()}
                    getCart={getCart}
                  />
                ))}
              </div>
              <div className="w-full  text-neutral-800 pb-2 pt-8">
                <div className="w-full flex justify-between items-center">
                  <div className="text-xl">TOTAL</div>

                  <div className="text-lg font-semibold flex gap-3 self-end">
                    <span className="font-normal">$</span>
                    {calTotal(cart.cartItems)}
                  </div>
                </div>
              </div>
              <button
                onClick={handleProductBuy}
                className="float-right text-center uppercase mb-4 py-5 mt-5 bg-green-700 hover:bg-green-600"
              >
                proceed to checkout
              </button>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      ) : (
        <div className="flex flex-col max-w-[720px] w-full mx-auto mt-20">
          <h1 className="w-52 mx-auto h-10 bg-neutral-100 rounded-xl animate-pulse"></h1>
          <div className="mt-20 flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-full flex  pb-4 border-b border-neutral-200 gap-8 relative"
              >
                <div className="w-28 h-28 animate-pulse bg-gray-100"></div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="absolute top-0 right-0 z-50 bg-neutral-100 h-8 w-8"></div>
                  <div className=" bg-neutral-100 animate-pulse w-10/12 h-8 mr-20"></div>
                  <div className=" bg-neutral-100 animate-pulse w-5/12 h-8 mt-3 mr-20"></div>
                  <div className="flex gap-3 self-end">
                    <span className=" w-8 h-8  bg-neutral-100 animate-pulse"></span>
                    <div className="w-32 h-8 bg-neutral-100 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full  text-neutral-800 pb-2 pt-8">
            <div className="w-full flex justify-between items-center">
              <div className="w-32 h-8 bg-neutral-100 animate-pulse"></div>

              <div className=" flex gap-3 self-end">
                <span className=" w-8 h-8  bg-neutral-100 animate-pulse"></span>
                <div className="w-32 h-8 bg-neutral-100 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="h-16 w-full bg-neutral-100 animate-pulse"></div>
        </div>
      )}
    </>
  );
};

export default isAuth(page);

const EmptyCart = () => {
  return (
    <div className="h-[calc(100svh-96px)] flex flex-col justify-center items-center">
      <h1 className="text-sm text-neutral-800 uppercase">
        No products in the cart
      </h1>
      <a href="/shop" className="bg-green-700 px-5 py-2 cursor-pointer mt-5">
        SHOP NOW
      </a>
    </div>
  );
};
