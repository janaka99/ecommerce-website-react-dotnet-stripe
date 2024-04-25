import React from "react";

type Props = {
  category: {
    name: string;
    src: string;
    id: number;
  };
};

const HeroCategory = ({ category }: Props) => {
  let dynamicClasses =
    "w-full h-56 bg-green-200 relative flex justify-start items-end group overflow-hidden";

  // Apply additional styles based on category properties
  if (category.name === "Ebooks") {
    dynamicClasses += " lg:col-span-3";
  } else if (category.name === "Digital Art") {
    dynamicClasses += " lg:col-span-3";
  } else if (category.name === "Courses") {
    dynamicClasses += " sm:col-span-2";
  } else if (category.name === "Software") {
    dynamicClasses += " lg:col-span-2";
  } else if (category.name === "Plugins") {
    dynamicClasses += " lg:col-span-2";
  }

  return (
    <div className={dynamicClasses}>
      <img
        src={category.src}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 group-hover:scale-[1.05] transition-all duration-200"
      />
      <h3 className="text-lg uppercase font-bold tracking-wider text-white relative pb-3 pl-4">
        {category.name}
      </h3>
    </div>
  );
};

export default HeroCategory;
