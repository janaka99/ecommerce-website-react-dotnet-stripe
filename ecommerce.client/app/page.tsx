import BtnLink from "@/components/UI/BtnLink/BtnLink";
import Button from "@/components/UI/Button/Button";
import { ABOUT_CARDS, CONSTANT_CATEGORIES } from "@/utils/constants";
import Image from "next/image";
import FeaturedProducts from "./_components/FeaturedProducts";
import HeroCategory from "./_components/HeroCategory";

export default function Home() {
  return (
    <main className="text-neutral-800">
      <section
        id="home"
        className="w-full flex  gap-10 items-center justify-between mt-40 relative"
      >
        <div className="w-full text-center lg:text-left lg:w-7/12 flex flex-col items-center ">
          <div className="text-4xl sm:text-4xl xl:text-6xl  font-bold">
            Discover the Best Digital Products Online
          </div>
          <div className="mt-4 w-full text-xl  ">
            Welcome to our online store where you can find a wide range of
            digital products, including trending ebooks, audiobooks, and more.
          </div>
          <div className="w-full flex justify-center lg:justify-start gap-5">
            <BtnLink
              link="/shop"
              text="See all products"
              classes="mt-4 "
              padding="py-4 px-8"
              textSize="text-base"
            />
          </div>
        </div>
        <div className="hidden lg:flex lg:w-5/12  justify-end items-center rounded-full ">
          <img
            src="hero.png"
            alt=""
            className="w-full aspect-square object-cover"
          />
        </div>
      </section>
      <section id="featured" className="mt-40 flex flex-col ">
        <h1 className="text-xl uppercase">Featured</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          <FeaturedProducts />
        </div>
      </section>
      <div className="mt-40 flex flex-col ">
        <h1 className="uppercase text-xl">What's your interest</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-6 mt-20">
          {CONSTANT_CATEGORIES.map((c) => (
            <HeroCategory key={c.id} category={c} />
          ))}
        </div>
      </div>
      <section
        id="about"
        className="w-full flex flex-col mt-40 text-start mb-40"
      >
        <h1 className="text-xl uppercase">Why Choose Digizone?</h1>
        <div className=" mt-20 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-10 2xl:gap-16 text-center">
          {ABOUT_CARDS.map((card) => (
            <div
              key={card.id}
              className="p-4  md:p-12 bg-neutral-100 rounded-xl w-full md:w-[80%] xl:w-full mx-auto"
            >
              <img src={`${card.src}`} alt="" className="mx-auto mb-10" />
              <div className="text-3xl mb-8">{card.title}</div>
              <div className=" mt-2 text-lg text-neutral-500">{card.text}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
