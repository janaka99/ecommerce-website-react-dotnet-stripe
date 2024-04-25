"use client";
import Button from "@/components/UI/Button/Button";
import useAddCategory from "@/hooks/category/useAddCategory";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const AddNewCategory = ({ getCategories }: any) => {
  const [form, setform] = useState({
    Name: "",
    Description: "",
  });

  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const handleCategoryAdd = async (e: FormEvent) => {
    e.preventDefault();
    setIsReqProcessing(true);
    if (form.Name == "" || form.Description == "") {
      toast.error("Fill both fields");
      return;
    }
    const res = await useFetchApi().post("category/add-new", form);
    if (res.status === 201) {
      toast.success("Category added successfully");
      setform({
        Name: "",
        Description: "",
      });
      getCategories();
      setIsReqProcessing(false);
      return;
    }
    toast.error("Something went wrong");
    setIsReqProcessing(false);
  };
  return (
    <form onSubmit={handleCategoryAdd} className="flex flex-col gap-4">
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
          className="w-full px-3 py-2 text-neutral-800 border text-sm rounded-md focus:outline-none focus:border-green-500"
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
          <span className="text-sm mr-2  text-white ">Adding...</span>
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
          Add
        </Button>
      )}
    </form>
  );
};

export default AddNewCategory;
