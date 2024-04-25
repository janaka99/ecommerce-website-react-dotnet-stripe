"use client";

import AuthContext from "@/context/AuthContext/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("There are no AuthContext instances");
  }

  return context;
}

export default useAuthContext;
