"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "@/app/globals.css";
import { poppins } from "@/fonts/font";
import Image from "next/image";

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm shadow-black/30 shadow-lg header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href={"/"} className="flex items-center">
              <span className="text-xl font-bold text-white">BarberShop</span>
            </Link>
            <div className="hidden md:flex space-x-8 font-bold text-gray-600">
              <Link href={"/"} className="hover:text-white duration-500">
                Home
              </Link>
              <Link href={"/book"} className="hover:text-white duration-500">
                Book_Appointment
              </Link>
              <Link href={"/gallery"} className="hover:text-white duration-500">
                Gallery
              </Link>
            </div>
            <div className="md:hidden">
              {show ? (
                <X onClick={() => setShow((p) => !p)} />
              ) : (
                <Menu onClick={() => setShow((p) => !p)} />
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Phone header */}
      <div
        className={`${show ? "show-menu z-20" : "-z-10"} hide-menu fixed flex flex-col justify-between w-full h-screen bg-black/80 `}
      >
        <div className="flex flex-col gap-7 pt-24 text-gray-500">
          <Link
            href={"/"}
            className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 duration-500`}
          >
            Home
          </Link>
          <Link
            href={"/book"}
            className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 duration-500`}
          >
            Book Appointment
          </Link>
        </div>
        <div className="text-white mb-28 flex justify-center items-center">
          <Link href={"/"}>
            <Image
              width={50}
              height={50}
              alt="logo"
              src={"/images/favicon.ico"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
