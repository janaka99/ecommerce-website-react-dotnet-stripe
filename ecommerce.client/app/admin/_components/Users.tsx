"use client";
import { useFetchApi } from "@/hooks/useFetchApi";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SkelatonAdmin from "./SkelatonAdmin";
import { Span } from "next/dist/trace";
import { BiEdit } from "react-icons/bi";

type Props = {};

const Users = (props: Props) => {
  const [users, setUsers] = useState<any>(null);

  const getData = async () => {
    const res = await useFetchApi().get("account/all");
    console.log(res.data);
    if (res.status == 200) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return users == null ? (
    <SkelatonAdmin />
  ) : (
    <div className="flex flex-col gap-2 w-full pr-4">
      <div className="w-full"></div>
      <div className="text-xs flex items-center  w-full my-4">
        <div className="w-3/12">Name</div>
        <div className="w-4/12">Email</div>
        <div className="w-2/12">Account Type</div>
        <div className="w-2/12">Joined Date</div>
        <div className="w-1/12"></div>
      </div>
      {users.map((i: any) => (
        <div
          key={i.id}
          className="text-xs font-semibold flex items-center w-full border-b border-neutral-200 pb-2"
        >
          <div className="w-3/12">
            <div className="flex gap-2">
              <img
                src={i.avatar}
                alt=""
                className="w-10 h-10 object-cover bg-neutral-100 rounded-md"
              />
              <div className="flex-grow flex flex-col ">
                <span className="flex-1 flex items-center justify-start text-xs font-semibold">
                  {i.userName}
                </span>
              </div>
            </div>
          </div>
          <div className="w-4/12">{i.email}</div>
          <div className="w-2/12 flex gap-2">
            {i.roles.map((role: string) => (
              <span key={role}>{role}</span>
            ))}
          </div>
          <div className="w-2/12">{i.created_at}</div>
          <button className="cursor-pointer w-1/12 flex justify-end">
            <BiEdit />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
