"use client";
import Header from "@/components/header/header";
import { montserrat } from "@/fonts/font";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [services, setServices] = useState<
    { id: number; time: number; price: string; name: string }[] | null
  >();
  const [name, setName] = useState<string>()
  const [price, setPrice] = useState<string>()
  const [time, setTime] = useState<string>()
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function getRole() {
      const auth = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", auth.data?.user?.id)
        .single();
      if (data?.role !== "admin") {
        router.push("/");
      }
    }

    async function getServices() {
      const services_db = await supabase
        .from("services")
        .select("id, time, price, name")
        .order("id", { ascending: true });
      setServices(services_db?.data);
    }

    getRole();
    getServices();
  }, [router]);

  const deleteService = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const response = await fetch("/api/delete-service", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.log(response);
      }
      window.location.reload()
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch("/api/add-service", {
      method: "POST",
      body: JSON.stringify({name, price, time}),
    })

    if(!response.ok){
      console.log(response)
    }
    window.location.reload()
  }
  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
        Services
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center gap-3">
        <div className="flex flex-col">
          <label>Name:</label>
          <input
            type="text"
            required
            placeholder="Prerja e Flokeve"
            className="py-1 px-2 rounded-lg bg-transparent border border-white"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Price:</label>
          <input
            type="number"
            required
            placeholder="999"
            className="py-1 px-2 rounded-lg bg-transparent border border-white"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Time: (min)</label>
          <input
            type="number"
            required
            placeholder="30"
            className="py-1 px-2 rounded-lg bg-transparent border border-white"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button
          className="bg-red-500 px-3 py-1 rounded-lg font-bold hover:bg-red-400 duration-300"
          type="submit"
        >
          Add Service
        </button>
      </form>

      <div className="mx-auto mt-10 w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {services && services.length > 0 && (
          <>
            {services.map((s, ind) => (
              <div
                className="p-3 border-2 border-white rounded-lg flex flex-col items-center justify-between"
                key={ind}
              >
                <div className="mb-3">
                  <h1 className={`${montserrat.className} text-center text-xl`}>
                    {s.name}
                  </h1>
                </div>
                <div className="mb-3">
                  <h1 className="text-center text-green-500">{s.price} Den</h1>
                  <h1 className="text-center text-red-500">
                    {s.time * 30} min
                  </h1>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    onClick={() => deleteService(s.id)}
                    className="bg-red-500 px-3 py-1 rounded-lg font-bold hover:bg-red-400 duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
