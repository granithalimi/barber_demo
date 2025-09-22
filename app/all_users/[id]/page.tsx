"use client";

import Header from "@/components/header/header";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [profile, setProfile] = useState<{id:number, user_id:string, role:string, name:string}| null>();
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient();
    async function getData() {
      const { id } = await params;
      const { data } = await supabase
        .from("profiles")
        .select("id, user_id, name, role")
        .eq("user_id", id)
        .single();

      setProfile(data)
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

    getRole();
    getData();
  }, [router, params]);

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
    </main>
  );
}
