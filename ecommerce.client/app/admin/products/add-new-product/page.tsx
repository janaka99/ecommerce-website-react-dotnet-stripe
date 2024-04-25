"use client";
import Button from "@/components/UI/Button/Button";
import Product from "@/app/admin/products/_components/Product/Product";
import useGetCategories from "@/hooks/category/useGetCategories";
import useAddProduct from "@/hooks/product/useAddProduct";
import { CategoryType } from "@/types/categoryTypes";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useFetchApi } from "@/hooks/useFetchApi";
import isAuth from "@/components/Layouts/IsAuth/IsAuth";
import IsAdmin from "@/components/HOC/IsAdmin/IsAuth";

type ProductState = {
  Title: string;
  Price: number;
  Description: string;
  CategoryId: null | number;
};

const page = () => {
  const [file, setFile] = useState<any | null>(null);
  const [tempImgUrl, setTempImgUrl] = useState<any>(null);
  const [productAdding, setProductAdding] = useState(false);
  const [isPageLoading, setisPageLoading] = useState(true);

  const { error, isReqProcessing, addProduct } = useAddProduct();
  const { getCategories } = useGetCategories();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [product, setProduct] = useState<ProductState>({
    Title: "",
    Price: 0,
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

  const getAllCategories = async () => {
    setisPageLoading(true);
    const res = await getCategories();
    if (res.status == 200) {
      setCategories(res.data);
      setisPageLoading(false);
    }
  };

  const addNewProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      var form = new FormData();

      if (file === undefined || file === null) {
        toast.error("Please select a image");
        return;
      }
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
      setProductAdding(true);
      const res = await useFetchApi().post("product/add-new", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setProduct({
          Title: "",
          Price: 0,
          Description: "",
          CategoryId: null,
        });
        setProductAdding(false);
        toast.success("Successfully added a product");
        return;
      }
      toast.error("Error adding product");
      setProductAdding(false);
    } catch (error) {
      setProductAdding(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (isPageLoading) {
    <div className="flex-grow ">
      <div className="flex justify-center items-center absolute top-0 left-0 h-[100svh] w-full overflow-hidden">
        <AiOutlineLoading size={25} className="text-neutral-800 animate-spin" />
      </div>
    </div>;
  }

  return (
    <div className="flex-grow flex justify-center items-center ">
      <div className="bg-neutral-100 text-neutral-800  p-8 rounded shadow-md w-full max-w-[1024px]">
        <div className="flex w-full flex-col gap-5 justify-between items-center mb-6">
          <h2 className="text-lg uppercase font-semibold ">Add new product</h2>
        </div>
        <form
          onSubmit={addNewProduct}
          className="flex flex-col gap-4"
          encType="multipart/form-data"
        >
          <div className="">
            <div className="w-[200px] h-[200px] bg-neutral-200 mb-5 relative">
              <img
                src={
                  tempImgUrl
                    ? tempImgUrl
                    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                alt=""
                className="w-full h-full object-cover"
              />
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
              disabled={productAdding}
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
                value={product.Title}
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    Title: e.target.value,
                  }));
                }}
                disabled={productAdding}
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
                value={product.Price}
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    Price: parseFloat(e.target.value),
                  }));
                }}
                required
                disabled={productAdding}
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="Description"
              className="block text-neutral-800 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              rows={5}
              id="Description"
              name="Description"
              className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-green-500 text-neutral-800"
              placeholder="Description"
              value={product.Description}
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  Description: e.target.value,
                }));
              }}
              required
              disabled={isReqProcessing}
            />
          </div>
          <select
            className="w-full p-2 text-black text-sm"
            onChange={(e) => {
              setProduct((prev) => ({
                ...prev,
                CategoryId: parseInt(e.target.value),
              }));
            }}
          >
            <option>Select Category</option>
            {categories?.map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>

          {isReqProcessing ? (
            <Button
              disabled={isReqProcessing}
              classes="h-10 flex justify-center items-center animate-pulse mt-2"
              bgColor="bg-green-900"
              textSize="text-sm"
            >
              <span className="text-sm mr-2  text-neutral-300 ">Adding...</span>
              <AiOutlineLoading3Quarters
                // size={25}
                className="text-white animate-spin "
              />
            </Button>
          ) : (
            <Button
              btnType="submit"
              classes="h-10 flex justify-center items-center hover:bg-green-600 outline-none transition-all duration-150 mt-2"
              bgColor="bg-green-700"
              textSize="text-sm"
            >
              Add new product
            </Button>
          )}
        </form>
      </div>
      <div className=""></div>
    </div>
  );
};

export default IsAdmin(page);
