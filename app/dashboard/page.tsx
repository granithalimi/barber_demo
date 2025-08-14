import Header from "@/components/header/header";
import { createClient } from "@/lib/supabase/server";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  // get auth user_id
  const auth = await supabase.auth.getUser();

  // get user role by id
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", auth.data?.user?.id)
    .single();

  if (data?.role !== "admin") {
    redirect("/");
  }
  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <div className="flex justify-center gap-4">
        <Link
          className="px-5 py-2 rounded-lg border border-white flex gap-1 hover:bg-white hover:text-black duration-300"
          href={"/appointments"}
        >
          Appointments
          <Calendar />
        </Link>
        <Link
          className="px-5 py-2 rounded-lg border border-white flex gap-1 hover:bg-white hover:text-black duration-300"
          href={"/all_users"}
        >
          Users
          <Users />
        </Link>
      </div>
    </main>
  );
}
