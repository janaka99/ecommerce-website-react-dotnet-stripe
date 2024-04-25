import React, { ButtonHTMLAttributes } from "react";

type Props = {
  classes?: string;
  textSize?: string;
  onClick?: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
  bgColor?: string;
  btnType?: "submit" | "reset" | "button" | undefined;
};

function Button({
  children,
  classes = "",
  textSize = "text-base",
  onClick,
  disabled = false,
  bgColor = "bg-green-700",
  btnType = undefined,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={btnType}
      className={` px-4 py-2 outline-none cursor-pointer text-white ${bgColor}   ${textSize}   ${classes}`}
    >
      {children}
    </button>
  );
}

export default Button;
