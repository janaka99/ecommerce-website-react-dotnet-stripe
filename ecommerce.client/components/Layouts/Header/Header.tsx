"use client";
import Button from "@/components/UI/Button/Button";
import Logo from "@/components/UI/Logo/Logo";
import { HEADER_NAV_LIST } from "@/utils/constants";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderSkelaton from "./HeaderSkelaton";
import BtnLink from "@/components/UI/BtnLink/BtnLink";
import useAuthContext from "@/hooks/useAuthContext";

type Props = {};

function Header({}: Props) {
  const { isLoading, logout, isAuthenticated } = useAuthContext();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // const logout = useLogout();

  if (isLoading) {
    return <HeaderSkelaton />;
  }

  return (
    <header className="w-full flex justify-between items-center h-24 z-[49] text-neutral-800">
      <Logo color="text-neutral-800" />
      <nav className="hidden md:flex gap-10 text-sm uppercase items-center">
        {HEADER_NAV_LIST.map((link, i) => (
          <Link
            key={i}
            href={`${link.to}`}
            className="hover:line-through tracking-wide font-semibold text-neutral-800"
          >
            {link.text}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Button
              onClick={logout}
              classes="uppercase"
              textSize="text-sm"
              btnType="button"
            >
              Log out
            </Button>
          </>
        ) : (
          <BtnLink
            link="/"
            text="login"
            classes="uppercase"
            textSize="text-sm"
          />
        )}
      </nav>

      <button
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
        className="z-50 flex md:hidden"
      >
        {isNavOpen ? (
          <AiOutlineClose size={25} className="text-white" />
        ) : (
          <GiHamburgerMenu size={25} className="text-neutral-800" />
        )}
      </button>
      <nav
        className={` flex md:hidden  w-screen h-screen absolute top-0 left-0 z-40 bg-neutral-800 flex-col justify-center items-center gap-2  transition-all duration-200 ${
          isNavOpen ? " translate-y-0" : "-translate-y-full"
        }`}
      >
        {HEADER_NAV_LIST.map((link, i) => (
          <Link
            key={i}
            href={`${link.to}`}
            className="hover:line-through text-white text-3xl uppercase"
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
