"use client";

import { Calendar, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import { poppins } from "@/fonts/font";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setAuth(false);
      } else {
        setAuth(true);
        const profile = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", data?.user?.id)
          .single();
        if (profile?.data?.role == "admin") {
          setRole("admin");
        } else if (profile?.data?.role == "barber") {
          setRole("barber");
        }
      }
    }

    checkUser();
  });

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };
  return (
    <>
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm shadow-black/30 shadow-lg header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href={"/"} className="flex items-center">
              <span className="text-xl font-bold text-white">BarberShop</span>
            </Link>
            <div className="hidden md:flex space-x-8 font-bold text-gray-600">
              {role == "admin" && (
                <Link
                  href={"/dashboard"}
                  className="hover:text-white duration-500"
                >
                  <LayoutDashboard />
                </Link>
              )}
              {role == "barber" && (
                <Link
                  href={"/appointments"}
                  className="hover:text-white duration-500"
                >
                  <Calendar />
                </Link>
              )}
              {role == "client" && (
                <Link href={"/"} className="hover:text-white duration-500">
                  Home
                </Link>
              )}
              <Link href={"/book"} className="hover:text-white duration-500">
                Book_Appointment
              </Link>
              <Link href={"/gallery"} className="hover:text-white duration-500">
                Gallery
              </Link>
              {auth ? (
                <button
                  onClick={logout}
                  className="hover:text-white duration-500"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href={"/auth/login"}
                  className="hover:text-white duration-500"
                >
                  SignIn
                </Link>
              )}
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
          {role == "admin" && (
            <Link
              href={"/dashboard"}
              className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 duration-500 flex gap-1`}
            >
              <LayoutDashboard />
              Dashboard
            </Link>
          )}
          {role == "barber" && (
            <Link
              href={"/appointments"}
              className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 duration-500 flex gap-1`}
            >
              <Calendar />
              Appointments
            </Link>
          )}
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
          <Link
            href={"/gallery"}
            className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 duration-500`}
          >
            Gallery
          </Link>
          {auth ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link
              href={"auth/login"}
              className={`${poppins.className} hover:text-white w-11/12 mx-auto border-b border-gray-400 text-start duration-500`}
            >
              Signin
            </Link>
          )}
        </div>
        <div className="text-white mb-28 flex justify-center items-center">
          <Link href={"/"}>
            <Image width={50} height={50} alt="logo" src={"/images/logo.png"} />
          </Link>
        </div>
      </div>
    </>
  );
}
