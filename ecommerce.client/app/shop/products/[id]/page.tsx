"use client";
import Review from "@/components/Layouts/Review/Review";
import useAddToCart from "@/hooks/cart/useAddToCart";
import useGetSingleProduct from "@/hooks/product/useGetSingleProduct";
import { useRouter } from "next/navigation";
import { Rating } from "primereact/rating";
import React, { useEffect, useState } from "react";

const page = (props: any) => {
  const {
    isReqProcessing: isGetSingleProductProcessing,

    getSingleProduct,
  } = useGetSingleProduct();
  const { error, isReqProcessing, addToCart } = useAddToCart();
  const router = useRouter();
  const [product, setProduct] = useState<ProductState | null>();

  const getProduct = async () => {
    const res = await getSingleProduct(props.searchParams.id);

    if (res.status === 200) {
      setProduct({
        ProductId: res.data.id,
        Picture: res.data.picture,
        Title: res.data.title,
        Price: res.data.price,
        Description: res.data.description,
        CategoryId: res.data.categoryId,
        Reviews: res.data.reviews,
        Category: res.data.category,
      });
    }
  };

  const handleProductBuy = async (id: number) => {
    await addToCart(id);
    if (error) {
      console.log("Product Add Failed");
    } else {
      console.log("Product added successfully");
      router.push("/user/cart");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (product == null) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-14 my-6 text-neutral-800">
      <div className="w-full  flex flex-col-reverse md:flex-row md:justify-between gap-4 md:gap-10">
        <div className="w-full md:max-w-[400px] h-[40vh] p-4 bg-neutral-100">
          <img
            src={product.Picture}
            alt=""
            className="w-full max-w-[400px] object-cover h-full"
          />
        </div>
        <div className="flex-grow flex flex-col gap-4 justify-start ">
          <div className="text-3xl md:text-5xl ">{product.Title}</div>
          <div className="text-xl text-neutral-800 font-bold">
            {product.Category?.name}
          </div>
          <div className="text-neutral-500">
            {product.Reviews?.length} reviews
          </div>
          <div className="text-neutral-500">{product.Description}</div>

          <span className="text-3xl font-bold">{product.Price} $</span>
          <button
            onClick={() => handleProductBuy(product.ProductId)}
            className="w-fit px-10 py-2 uppercase bg-green-600 text-white"
          >
            Buy now
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <h1 className="text-lg uppercase">
          What Our customer says &nbsp;{" "}
          <span>({product.Reviews ? product.Reviews.length : 0})</span>
        </h1>
        <div className="flex flex-col gap-4">
          {product.Reviews ? (
            product.Reviews.map((Review) => (
              <div
                key={Review.id}
                className="flex flex-col gap-4 bg-neutral-100 p-4 "
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={Review.user.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-neutral-800">
                    {Review.user.userName}
                  </span>
                </div>
                <Rating value={Review.rating} cancel={false} />
                <div className="text-sm text-neutral-500">{Review.comment}</div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
