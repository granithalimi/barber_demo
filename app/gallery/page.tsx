"use client";
import Header from "@/components/header/header";
import { montserrat } from "@/fonts/font";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [imgs, setImgs] = useState<string[]>();
  const [singleImage, setSingleImage] = useState<string>("");

  useEffect(() => {
    async function getPics() {
      const supabase = createClient();
      const { data, error } = await supabase.storage.from("gallery").list("");
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
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <h1 className={`${montserrat.className} text-3xl text-center text-white mb-6`}>
        Gallery
      </h1>

      <button onClick={() => setSingleImage("")} className={`${singleImage == "" ? "hidden" : ""} z-50 fixed top-0 left-0 w-full h-screen bg-transparent`}></button>
      <div className={`${singleImage == "" ? "hidden" : ""} fixed top-1/2 left-1/2 h-96 w-80 md:w-1/2 md:h-auto lg:w-1/4 rounded-lg border-white border-4 shadow-black/60 shadow-lg`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {singleImage != "" &&
          <Image src={singleImage} width={800} height={800} alt="selectedsingleimage" className="w-full h-full object-cover" />
        }
      </div>
      {imgs && imgs.length > 0 ? (
        <div className="mx-auto w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 cursor-pointer">
          {imgs.map((i, ind) => (
            <Image
              src={i}
              width={300}
              height={300}
              alt={`pic${ind}`}
              className="aspect-square object-cover duration-300 overflow-hidden rounded-xl border-white border-2 shadow-black/60 shadow-lg"
              onClick={() => setSingleImage(i)} key={ind}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center">No Images yet :(</h1>
      )}
    </main>
  );
}
