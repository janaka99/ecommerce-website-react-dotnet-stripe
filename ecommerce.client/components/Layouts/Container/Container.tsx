import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-[1440px] flex-grow w-full  flex flex-col mx-auto px-10 md:px-16 lg:px-20">
      {children}
    </div>
  );
};

export default Container;
