"use client";

import Header from "@/components/header/header";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    const supabase = createClient();
    async function getData() {
      const { id } = await params;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", id)
        .single();

      setProfile(data)
    }
    getData();
  }, [params]);

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
    </main>
  );
}
