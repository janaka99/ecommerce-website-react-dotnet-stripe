"use client";
import useAddToCart from "@/hooks/cart/useAddToCart";
import useGetProducts from "@/hooks/product/useGetProducts";
import React, { useEffect, useState } from "react";

export const Product = ({ product }: any) => {
  const { error, isReqProcessing, addToCart } = useAddToCart();

  const handleProductBuy = async () => {
    await addToCart(product.id);
    if (error) {
      console.log("Product Add Failed");
    } else {
      console.log("Product added successfully");
      alert("Product added successfully");
    }
  };

  return (
    <div className="w-full flex flex-col aspect-[10/12] border border-neutral-100 hover:border-green-600 group">
      <a
        href={`/shop/products/view?id=${product.id}`}
        className="w-full flex flex-col "
      >
        <div className="w-full aspect-square  p-4 overflow-hidden bg-neutral-100">
          <div className="w-full h-full overflow-hidden  border ">
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
      </a>
      <div className="flex flex-grow justify-between items-end px-2 pb-2">
        <div className="flex items-center gap-4 ">
          <span className="text-sm font-bold">{product.price} $</span>
          {product.reviews.length > 0 && (
            <span className="text-sm">( {product.reviews.length} )</span>
          )}
        </div>
        <button
          onClick={handleProductBuy}
          className="px-2 py-1 bg-green-700 text-xs uppercase hover:bg-green-800 text-white"
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

type Props = {};

const Products = (props: Props) => {
  const [products, setProducts] = useState<any>(null);

  const { isReqProcessing, getProducts } = useGetProducts();

  const getAllProducts = async () => {
    const res = await getProducts();
    if (res.status == 200) {
      setProducts(res.data);
    } else {
      console.log("error: " + res.status);
    }
  };

  useEffect(() => {
    getAllProducts();
    console.log(products);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products
        ? products.map((p: any) => (
            <Product key={p.id.toString()} product={p} />
          ))
        : [1, 2, 3, 4, 5, 6].map((i) => (
            <>
              <div className="w-full flex flex-col gap-3 ">
                <div className="w-full aspect-square bg-neutral-100 overflow-hidden  animate-pulse rounded-xl"></div>
                <div className="w-full h-5 rounded-xl bg-neutral-100 animate-pulse"></div>
                <div className="flex justify-between gap-10">
                  <div className="flex-grow h-5 rounded-xl bg-neutral-100 animate-pulse"></div>
                  <div className="w-24 h-5 bg-neutral-100 animate-pulse rounded-xl"></div>
                </div>
              </div>
            </>
          ))}
    </div>
  );
};

export default Products;
