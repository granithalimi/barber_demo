"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Gallery() {
  const [imgs, setImgs] = useState<string[]>();

  const [refGalleryText, inViewGalleryText] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [refGalleryContent, inViewGalleryContent] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    async function getPics() {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("gallery")
        .list("", { limit: 4 });
      if (error) {
        console.log(error);
        return;
      } else if (data) {
        const urls = data.map((file) => {
          const { data: publicUrlData } = supabase.storage
            .from("gallery")
            .getPublicUrl(file.name);
          return publicUrlData.publicUrl;
        });
        setImgs(urls);
      }
    }

    getPics();
  }, []);

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={refGalleryText}>
          <h2
            className={`${inViewGalleryText ? "show-text" : ""} hide-text3 text-white text-4xl md:text-5xl font-bold mb-4 duration-500`}
          >
            Gallery
          </h2>
          <p
            className={`${inViewGalleryText ? "show-text" : ""} hide-text3 text-gray-400 text-lg max-w-2xl mx-auto mb-5 duration-500`}
          >
            Experience Our Latest Best Cuts - Modern Barbershop Craftsmanship
          </p>

          {imgs && imgs.length > 0 && (
            <div>
              <div
                ref={refGalleryContent}
                className={`${inViewGalleryContent ? "show-text" : ""} hide-text3 mx-auto w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 duration-500`}
              >
                {imgs.map((i, ind) => (
                  <div key={ind} className="mb-1 cursor-default">
                    <Image
                      src={i}
                      width={300}
                      height={300}
                      alt={`pic${ind}`}
                      className="aspect-square object-cover duration-300 overflow-hidden rounded-xl border-white border-2 shadow-black/60 shadow-lg mb-1 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={"/gallery"}
          className={`${inViewGalleryContent ? "show-text" : ""} hide-content border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black duration-500`}
        >
          Explore our work
        </Link>
      </div>
    </section>
  );
}
