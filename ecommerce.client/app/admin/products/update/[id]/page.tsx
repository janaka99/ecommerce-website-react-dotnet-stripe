"use client";
import Button from "@/components/UI/Button/Button";
import Product from "@/app/admin/products/_components/Product/Product";
import useGetCategories from "@/hooks/category/useGetCategories";
import useAddProduct from "@/hooks/product/useAddProduct";
import useGetSingleProduct from "@/hooks/product/useGetSingleProduct";
import { CategoryType } from "@/types/categoryTypes";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { toast } from "react-toastify";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import { useFetchApi } from "@/hooks/useFetchApi";
import IsAdmin from "@/components/HOC/IsAdmin/IsAuth";

const page = (props: any) => {
  const [file, setFile] = useState<any | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<any>(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [productUpdating, setProductUpdating] = useState(false);

  const { getCategories } = useGetCategories();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const { getSingleProduct } = useGetSingleProduct();

  const [product, setProduct] = useState<ProductState>({
    ProductId: null,
    Picture: "",
    Title: "",
    Price: undefined,
    Description: "",
    CategoryId: null,
  });

  const ImagePreview = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target?.result;
        setTempImgUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFile(null);
    setTempImgUrl(null);
  };

  const getProduct = async () => {
    await getSingleProduct(props.searchParams.id);
    const res = await getSingleProduct(props.searchParams.id);

    if (res.status === 200) {
      setProduct({
        ProductId: res.data.id,
        Picture: res.data.picture,
        Title: res.data.title,
        Price: res.data.price,
        Description: res.data.description,
        CategoryId: res.data.categoryId,
      });
      return;
    }
    return;
  };

  const getAllCategories = async () => {
    const res = await getCategories();
    if (res.status == 200) {
      setCategories(res.data);
    }
  };

  const updateProduct = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (product == null) {
        return;
      }
      var form = new FormData();

      if (
        product.Description === "" ||
        product.Price === null ||
        product.Title === "" ||
        product.CategoryId === null
      ) {
        toast.error("Fill the form");
        return;
      }

      Object.keys(product).forEach((key) => {
        form.append(key, (product as any)[key]);
      });
      form.append("file", file);
      setProductUpdating(true);
      const res = await useFetchApi().put("product/update", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        getProduct();
        setProductUpdating(false);
        toast.success("Successfully updated product");
        return;
      }
      toast.error("Error adding product");
      setProductUpdating(false);
    } catch (error) {
      setProductUpdating(false);
    }
  };
  const loadPageData = async () => {
    setIsPageLoading(true);
    await getProduct();
    await getAllCategories();
    setIsPageLoading(false);
  };
  useEffect(() => {
    loadPageData();
  }, []);

  if (isPageLoading) {
    return (
      <div className="flex-grow ">
        <div className="flex justify-center items-center absolute top-0 left-0 h-[100svh] w-full overflow-hidden">
          <AiOutlineLoading
            size={25}
            className="text-neutral-800 animate-spin"
          />
        </div>
      </div>
    );
  }

  if (product.ProductId == null) {
    return (
      <div className="flex-grow ">
        <div className="flex justify-center items-center absolute top-0 left-0 h-[100svh] w-full overflow-hidden">
          <AiOutlineLoading
            size={25}
            className="text-neutral-800 animate-spin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex justify-center items-center ">
      <div className="bg-neutral-100 text-neutral-800  p-8 rounded shadow-md w-full max-w-[1024px]">
        <div className="flex w-full flex-col gap-5 justify-between items-center mb-6">
          <h2 className="text-lg uppercase font-semibold ">Update product</h2>
        </div>
        <form
          onSubmit={updateProduct}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
        >
          <div className="">
            <div className="w-[200px] h-[200px] bg-neutral-200 mb-5 relative">
              <img
                src={tempImgUrl ? tempImgUrl : product.Picture}
                alt=""
                className="w-full h-full object-cover"
              />
              {file && (
                <button
                  onClick={() => removeImage()}
                  className="absolute p-2 top-2 right-2 bg-neutral-800 text-white"
                >
                  <AiOutlineDelete />
                </button>
              )}
            </div>
            <label
              htmlFor="imageUpload"
              className="block w-[200px] py-5 bg-neutral-500 text-white text-sm font-semibold text-center cursor-pointer"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden w-fit px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 "
              placeholder="Description"
              disabled={productUpdating}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                ImagePreview(selectedFile);
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <label
                htmlFor="Title"
                className="block  text-sm font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="Title"
                name="Title"
                className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-black"
                placeholder="Title"
                defaultValue={product.Title}
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    Title: e.target.value,
                  }));
                }}
                disabled={productUpdating}
                required
              />
            </div>
            <div className="">
              <label
                htmlFor="Price"
                className="block  text-sm font-semibold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="Price"
                name="Price"
                className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-black"
                placeholder="Price"
                defaultValue={product.Price}
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    Price: parseFloat(e.target.value),
                  }));
                }}
                required
                disabled={productUpdating}
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="Description"
              className="block  text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              rows={5}
              id="Description"
              name="Description"
              className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-black"
              placeholder="Description"
              defaultValue={product.Description}
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  Description: e.target.value,
                }));
              }}
              required
              disabled={productUpdating}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-5">
              <select
                className="w-fit p-2 text-black text-sm"
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    CategoryId: parseInt(e.target.value),
                  }));
                }}
              >
                {/* <option value={product.CategoryId}>{product.</option> */}
                {categories?.map((c) => (
                  <option key={c.id.toString()} value={c.id.toString()}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {productUpdating ? (
            <Button
              disabled={productUpdating}
              classes="h-10 flex justify-center items-center animate-pulse mt-2"
              bgColor="bg-green-900"
              textSize="text-sm"
            >
              <span className="text-sm mr-2  text-neutral-300 ">
                Updating...
              </span>
              <AiOutlineLoading3Quarters
                // size={25}
                className=" animate-spin "
              />
            </Button>
          ) : (
            <Button
              btnType="submit"
              classes="h-10 flex justify-center items-center hover:bg-green-600 outline-none transition-all duration-150 mt-2"
              bgColor="bg-green-700"
              textSize="text-sm"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <div className=""></div>
    </div>
  );
};

export default IsAdmin(page);
