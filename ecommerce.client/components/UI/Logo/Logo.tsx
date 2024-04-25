import Link from "next/link";
import React from "react";
import { BsBookFill } from "react-icons/bs";

const Logo = ({ color = " text-neutral-800" }: { color: any }) => {
  return (
    <Link
      href="/"
      className={`text-xl uppercase font-bold tracking-widest flex items-center gap-2 ${color}`}
    >
      <BsBookFill size={25} className="text-green-700" />
      DIGIZONE
    </Link>
  );
};

export default Logo;
