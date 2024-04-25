"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SkelatonAdmin from "./SkelatonAdmin";
import { BiEdit } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

type Props = {};

const Products = (props: Props) => {
  const [Products, setProducts] = useState<any>(null);
  const [filterActive, setFilterActive] = useState<any>({
    category: false,
  });

  const getData = async () => {
    const res = await useFetchApi().get("product");
    console.log(res);
    if (res.status == 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return Products == null ? (
    <SkelatonAdmin />
  ) : (
    <div className="flex flex-col gap-2 w-full pr-4">
      <div className="w-full flex gap-4 mt-4">
        <a
          href="/admin/products/add-new-product"
          className="px-2 py-1 bg-gray-100 flex gap-2 w-fit text-sm"
        >
          <span>Add new product</span> <PiPlus size={25} />
        </a>
        {/* <div className="w-fit px-2 py-1 bg-neutral-100 relative">
          <button
            onClick={() =>

              setFilterActive((prev: any) => ({
                ...prev,
                category: !prev.category,
              }))
            }
            className="flex items-center gap-2 text-sm"
          >
            Category
            <IoIosArrowDown size={20} />
          </button>
          {filterActive.category && (
            <div className="absolute top-full left-0 w-full">
              <button className="px-2 py-1 bg-neutral-100 w-full text-sm">
                Ebooks
              </button>
              <button className="px-2 py-1 bg-neutral-100 w-full text-sm">
                Ebooks
              </button>
              <button className="px-2 py-1 bg-neutral-100 w-full text-sm">
                Ebooks
              </button>
            </div>
          )}
        </div> */}
      </div>
      <div className="text-xs flex items-center  w-full my-4">
        <div className="w-6/12">Name</div>
        <div className="w-2/12">Category</div>
        <div className="w-2/12">Add Date</div>
        <div className="w-1/12">Sold</div>
        <div className="w-1/12"></div>
      </div>
      {Products.map((i: any) => (
        <div
          key={i.id}
          className="text-xs font-semibold flex items-center w-full border-b border-neutral-200 pb-2"
        >
          <div className="w-6/12">
            <div className="flex gap-2">
              <img
                src={i.picture}
                alt=""
                className="w-10 h-10 bg-neutral-100 rounded-md"
              />
              <div className="flex-grow flex flex-col ">
                <span className="flex-1 flex items-center justify-start text-xs font-semibold">
                  {i.title}
                </span>
              </div>
            </div>
          </div>
          <div className="w-2/12">
            {i.category ? i.category.name : "Uncategorized"}
          </div>
          <div className="w-2/12">{i.created_at.slice(0, 10)}</div>
          <div className="w-1/12">{i.sold}</div>
          <div className="cursor-pointer w-1/12 flex justify-end">
            <a
              className="text-neutral-900 p-2"
              href={`/admin/products/update/edit?id=${i.id}`}
            >
              <BiEdit size={20} className="hover:text-green-400 " />
            </a>
            <button className="text-neutral-900 p-2">
              <MdDelete size={20} className="hover:text-red-400 " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
