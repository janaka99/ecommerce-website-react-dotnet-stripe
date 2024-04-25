import Logo from "@/components/UI/Logo/Logo";
import React from "react";

const HeaderSkelaton = () => {
  return (
    <header className="w-full flex justify-between items-center h-24">
      <Logo />
      <nav className="hidden md:flex gap-10 text-sm uppercase items-center">
        <div className="h-5 w-16 bg-slate-200 animate-pulse "></div>
        <div className="h-5 w-16 bg-slate-200 animate-pulse "></div>
        <div className="h-5 w-16 bg-slate-200 animate-pulse "></div>
        <div className="h-5 w-16 bg-slate-200 animate-pulse "></div>
        <div className="h-5 w-16 bg-slate-200 animate-pulse "></div>
      </nav>
      <div className="flex md:hidden h-5 w-8 bg-slate-50/20 animate-pulse "></div>
    </header>
  );
};

export default HeaderSkelaton;
