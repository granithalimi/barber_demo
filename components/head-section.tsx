"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function HeadSection() {
  const [, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const [refSection, inViewSection] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-x-hidden"
      ref={refSection}
    >
      <Image
        src="/images/bg.png"
        alt="Background"
        fill
        priority
        onLoad={handleImageLoad}
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-4`}>
        <h1
          className={`${inViewSection ? "show-text" : ""} hide-text text-5xl md:text-7xl font-bold mb-6 duration-1000`}
        >
          <span className="text-white">Barber</span>
          <span className="text-gray-600">Shop</span>
        </h1>
          <p className={`${inViewSection ? "show-text" : ""} hide-text text-xl md:text-2xl text-gray-300 mb-8 duration-1000`}>
            Where Style Meets Precision
          </p>
          <p className={`${inViewSection ? "show-text" : ""} hide-text2 text-lg text-gray-400 mb-12 max-w-2xl mx-auto duration-1000`}>
            Experience the finest grooming services with our expert barbers.
            From classic cuts to modern styles, we deliver excellence in every
            detail.
          </p>
        {/* </div> */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#services"
            className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-500"
          >
            View Services
          </Link>
          <Link
            href={"/book"}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black duration-500"
          >
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link href="#services" className="text-barber-gold animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </Link>
      </div>
    </section>
  );
}
