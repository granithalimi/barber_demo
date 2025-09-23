"use client";

import Header from "@/components/header/header";
import { montserrat, poppins } from "@/fonts/font";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [profile, setProfile] = useState<{
    id: number;
    user_id: string;
    role: string;
    name: string;
  } | null>();
  const [services, setServices] = useState<
    { id: number; name: string }[] | null
  >();
  const router = useRouter();

  //Submiting states
  const [selectedS, setSelectedS] = useState<{ service_id: number }[] | null>();

  useEffect(() => {
    const supabase = createClient();
    async function getData() {
      const { id } = await params;
      const { data } = await supabase
        .from("profiles")
        .select("id, user_id, name, role")
        .eq("user_id", id)
        .single();

      setProfile(data);
    }

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
      const { data } = await supabase
        .from("services")
        .select("id, name")
        .order("id", { ascending: true });

      setServices(data);
    }

    getRole();
    getData();
    getServices();
  }, [router, params]);

  const handleServiceClick = (id: number) => {
    setSelectedS((prev) => {
      const exists = prev?.find((s) => s.service_id === id);

      if (exists) {
        return prev?.filter((service) => service.service_id !== id);
      }

      return prev ? [...prev, { service_id: id }] : [{ service_id: id }];
    });
  };

  const handleSubmit = async () => {
    const id = profile?.id;
    const resp = await fetch("/api/make-barber", {
      method: "POST",
      body: JSON.stringify({ selectedS, id }),
    });

    if (!resp.ok) {
      console.log(resp);
    }
    window.location.reload();
  };

  const handleMakeClient = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ role: "client" })
      .eq("id", profile?.id);

    if (error) {
      console.log(error);
    }

    const profiles_services = await supabase
      .from("profiles_services")
      .delete()
      .eq("profile_id", profile?.id);

    if (profiles_services.error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      {profile && (
        <div className="w-full">
          <h1 className={`${montserrat.className} text-center text-2xl mb-2`}>
            {profile.name}
          </h1>
          <h1
            className={`${montserrat.className} text-center text-lg mb-5 uppercase`}
          >
            {profile.role}
          </h1>
          {profile?.role == "client" ? (
            <>
              <h1 className="text-center">I am a Client</h1>
              {services && services.length > 0 ? (
                <>
                  <h1
                    className={`${poppins.className} text-xl text-center mt-10 mb-3`}
                  >
                    Select Services
                  </h1>
                  <div className="mx-auto w-11/12 md:w-2/3 grid grid-cols-3 gap-3 ">
                    {services.map((s, ind) => (
                      <button
                        className={`${selectedS?.find((S) => S.service_id === s.id) ? "bg-white text-black font-bold" : ""} border border-white rounded-lg py-1 hover:bg-white hover:text-black hover:scale-105 duration-300`}
                        key={ind}
                        onClick={() => handleServiceClick(s.id)}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center my-5">
                    <button
                      onClick={() => handleSubmit()}
                      className="bg-blue-500 px-2 font-extrabold py-1 rounded-lg hover:bg-blue-400 duration-300"
                    >
                      +Make Barber
                    </button>
                  </div>
                </>
              ) : (
                <h1>No services yet</h1>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-center">I am a Barber</h1>
              <button
                className="mt-4 px-3 py-1 rounded-lg font-bold bg-blue-500 hover:bg-blue-400 duration-300"
                onClick={() => handleMakeClient()}
              >
                Make Client
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
