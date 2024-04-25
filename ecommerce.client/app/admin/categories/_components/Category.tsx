"use client";
import { CategoryType } from "@/types/categoryTypes";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import EditCategoryModal from "./EditCategoryModel";
import IsModal from "@/components/Layouts/IsModal/IsModal";
import useDeleteCategory from "@/hooks/category/useDeleteCategory";
import { useFetchApi } from "@/hooks/useFetchApi";
import { toast } from "react-toastify";

type Props = {
  category: CategoryType;
  getCategories: () => Promise<void>;
};

const Category = ({ category, getCategories }: Props) => {
  const [isEditActive, setIsEditActive] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: any) => {
    setIsDeleting(true);
    try {
      const res = await useFetchApi().delete(`category/single/${id}`);
      if (res.status == 200) {
        setIsDeleting(false);
        toast.success("Successfully deleted the category");
        getCategories();
        return;
      }
      toast.error("Error deleting category");
      setIsDeleting(false);
    } catch (error) {
      toast.error("Error deleting category");

      setIsDeleting(false);
    }
  };

  const [editForm, setEditForm] = useState({
    Id: category.id,
    Name: category.name,
    Description: category.description,
  });

  const closeModal = () => {
    setIsEditActive(false);
    setEditForm({
      Id: category.id,
      Name: category.name,
      Description: category.description,
    });
  };

  return (
    <div className=" ">
      <div className="flex flex-col bg-neutral-200 p-2 rounded-lg gap-1">
        <div className="flex w-full justify-between items-center ">
          <div className="text-neutral-800 font-bold">{category.name}</div>

          <div className="text-neutral-800 flex items-center gap-2">
            <button onClick={() => setIsEditActive(true)}>
              <CiEdit size={25} className="hover:text-green-400" />
            </button>
            <button onClick={() => handleDelete(category.id)}>
              <MdDelete size={25} className="hover:text-red-400" />
            </button>
          </div>
        </div>
        <hr />
        <div className="text-sm text-neutral-800  ">{category.description}</div>
        <div className={``}></div>
      </div>
      {isEditActive && (
        <EditCategoryModal
          closeModal={closeModal}
          category={category}
          getCategories={getCategories}
          setIsEditActive={setIsEditActive}
        />
      )}
    </div>
  );
};

export default Category;
