"use client";

import { useState, useEffect } from "react";

function useIsMobile() {
  const isClient = typeof window !== "undefined";

  const [isMobile, setIsMobile] = useState(
    isClient ? window.innerWidth < 768 : false
  );
  const [isNavOpen, setIsNavOpen] = useState(false);

  const checkScreen = () => {
    setIsMobile(isClient ? window.innerWidth < 768 : false);
  };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, [isNavOpen, isClient]);

  return { isMobile, isNavOpen, toggleNav };
}

export default useIsMobile;
