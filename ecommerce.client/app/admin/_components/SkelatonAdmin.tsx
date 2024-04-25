import React from "react";

type Props = {};

const SkelatonAdmin = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <div className="w-full bg-neutral-100 animate-pulse h-8"></div>
      <div className="text-xs flex items-center box-border w-full my-4 gap-4">
        <div className="w-3/12 h-8 bg-neutral-100 animate-pulse"></div>
        <div className="w-4/12 h-8 bg-neutral-100 animate-pulse"></div>
        <div className="w-2/12 h-8 bg-neutral-100 animate-pulse"></div>
        <div className="w-2/12 h-8 bg-neutral-100 animate-pulse"></div>
        <div className="w-1/12 h-8 bg-neutral-100 animate-pulse"></div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div
          key={i}
          className="text-xs font-semibold flex items-center w-full border-b border-neutral-200 pb-2"
        >
          <div className="w-3/12">
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-neutral-100 animate-pulse"></div>
              <div className="flex-grow flex flex-col ">
                <span className="flex-1 w-full bg-neutral-100 animate-pulse h-8"></span>
              </div>
            </div>
          </div>
          <div className="w-4/12 bg-neutral-100 animate-pulse h-8"></div>
          <div className="w-2/12 bg-neutral-100 animate-pulse h-8"></div>
          <div className="w-2/12 bg-neutral-100 animate-pulse h-8"></div>
          <button className="cursor-pointer w-1/12 flex justify-end bg-neutral-100 animate-pulse h-8"></button>
        </div>
      ))}
    </div>
  );
};

export default SkelatonAdmin;
