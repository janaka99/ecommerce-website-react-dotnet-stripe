import Logo from "@/components/UI/Logo/Logo";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Container from "../Container/Container";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="w-full bg-neutral-900 pt-20 pb-16 ">
      <div className="max-w-[1440px] mx-auto px-10 md:px-16 lg:px-20 flex flex-col gap-10">
        <div className="w-full flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-5 justify-start max-w-[900px]">
            <Logo color="text-white" />
            <span className="text-sm text-neutral-100">
              Join our newsletter to stay up to date on features and new
              products
            </span>
            <div className="flex h-12">
              <input
                type="text"
                className="flex-grow p-2 h-full outline-none text-neutral-800 text-sm"
              />
              <button className="text-sm uppercase  text-white bg-green-700 border-none py-2 px-3">
                Subscribe
              </button>
            </div>
            <span className="text-sm text-neutral-400 ">
              By subscribing you agree with our Privacy Policy and provide
              consent to receive updated from our company
            </span>
          </div>
          <div className="flex gap-10 lg:gap-20 justify-between">
            <div className="flex flex-col gap-5">
              <h3 className="text-lg text-white font-bold">Shop</h3>
              <div className="flex flex-col gap-2">
                <a href="" className="text-sm text-neutral-400">
                  Scripts
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Ebooks
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Elements
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Websites
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-lg text-white font-bold">Shop</h3>
              <div className="flex flex-col gap-2">
                <a href="" className="text-sm text-neutral-400">
                  Scripts
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Ebooks
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Elements
                </a>
                <a href="" className="text-sm text-neutral-400">
                  Websites
                </a>
              </div>
            </div>

            <div className="flex flex-col  gap-5">
              <h3 className="text-lg text-white font-bold">Follow Us</h3>
              <div className="flex flex-col gap-2">
                <a
                  href=""
                  className="text-sm text-neutral-400 flex gap-2 items-center"
                >
                  <FaFacebook size={20} className="text-neutral-400" />
                  Facebook
                </a>
                <a
                  href=""
                  className="text-sm text-neutral-400 flex gap-2 items-center"
                >
                  <FaInstagram size={20} className="text-neutral-400" />
                  Instagram
                </a>
                <a
                  href=""
                  className="text-sm text-neutral-400 flex gap-2 items-center"
                >
                  <FaX size={20} className="text-neutral-400" />X
                </a>
                <a
                  href=""
                  className="text-sm text-neutral-400 flex gap-2 items-center"
                >
                  <FaLinkedin size={20} className="text-neutral-400" />
                  Linkedin
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center text-neutral-400">
          <span className="text-sm">2024 Digizone. All rights reserved</span>
          <div className="flex gap-4 md:gap-10">
            <Link href="/" className="text-sm underline">
              {" "}
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm underline">
              {" "}
              Terms of Services
            </Link>
            <Link href="/" className="text-sm underline">
              {" "}
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
