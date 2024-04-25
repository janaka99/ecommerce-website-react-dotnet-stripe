"use client";
import Button from "@/components/UI/Button/Button";

import { useFetchApi } from "@/hooks/useFetchApi";
import { CategoryType, UpdateCategoryType } from "@/types/categoryTypes";
import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

type Props = {
  category: CategoryType;
  getCategories: () => Promise<void>;
  setIsEditActive: Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};

const EditCategoryModal = ({
  category,
  getCategories,
  setIsEditActive,
  closeModal,
}: Props) => {
  const [form, setform] = useState<UpdateCategoryType>({
    Id: category.id,
    Name: category.name,
    Description: category.description,
  });

  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const handleCategoryAdd = async (e: FormEvent) => {
    e.preventDefault();
    setIsReqProcessing(true);
    if (
      form.Id === null ||
      form.Id === undefined ||
      form.Name == "" ||
      form.Description == ""
    ) {
      toast.error("Fill the form");
      return;
    }
    const res = await useFetchApi().put("category/update", form);
    if (res.status === 201) {
      setIsReqProcessing(false);
      getCategories();
      setIsEditActive(false);
      toast.success("Category updated successfully");
      return;
    }
    setIsReqProcessing(false);
    toast.error("Category updated failed");
  };

  const close = () => {
    setIsEditActive(false);
    document.body.style.overflow = "unset";
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-neutral-900/50 text-neutral-800">
      <form
        onSubmit={handleCategoryAdd}
        className="flex flex-col gap-4 bg-neutral-100 w-full max-w-[676px] p-4 rounded-md"
      >
        <div className="">
          <label
            htmlFor="Name"
            className="block text-neutral-800 text-sm font-semibold mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            className="w-full px-3 py-2 border text-neutral-800 text-sm rounded-md focus:outline-none focus:border-green-500"
            placeholder="Category Name"
            value={form.Name}
            onChange={(e) => {
              setform((prev) => ({
                ...prev,
                Name: e.target.value,
              }));
            }}
            disabled={isReqProcessing}
            required
          />
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-neutral-800 text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="text"
            name="Description"
            className="w-full px-3 py-2  text-neutral-800 border text-sm rounded-md focus:outline-none focus:border-green-500"
            placeholder="Description"
            value={form.Description}
            onChange={(e) => {
              setform((prev) => ({
                ...prev,
                Description: e.target.value,
              }));
            }}
            required
            disabled={isReqProcessing}
          />
        </div>

        {isReqProcessing ? (
          <Button
            disabled={isReqProcessing}
            classes="h-10 flex justify-center items-center animate-pulse mt-2"
            bgColor="bg-green-900"
            textSize="text-sm"
          >
            <span className="text-sm mr-2  text-neutral-300 ">Updating...</span>
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
            Update
          </Button>
        )}
      </form>
      <button onClick={close} className="absolute top-3 right-10">
        <AiOutlineClose size={24} className="text-white" />
      </button>
    </div>
  );
};

export default EditCategoryModal;
