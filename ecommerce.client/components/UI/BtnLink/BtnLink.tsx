import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  link: string;
  classes?: string;
  textSize?: string;
  padding?: string;
};

function BtnLink({
  text,
  link,
  classes = "",
  textSize = "text-base",
  padding = "py-2 px-4",
}: Props) {
  return (
    <Link
      href={link}
      className={`${padding}  text-white bg-green-700  ${textSize}  ${classes}`}
    >
      {text}
    </Link>
  );
}

export default BtnLink;
