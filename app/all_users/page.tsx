import Header from "@/components/header/header";
import Users from "@/components/users";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  // get auth user_id
  const auth = await supabase.auth.getUser();

  // get user role by id
  const { data } = await supabase
    .from("profiles")
    .select("role, id")
    .eq("user_id", auth.data?.user?.id)
    .single();
  if (data?.role !== "admin") {
    redirect("/");
  }

  const all_users = await supabase
    .from("profiles")
    .select("*")
    .neq("id", data?.id)
    .order("id", { ascending: true });

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>

      {all_users.data && all_users.data.length > 0 && <Users users={all_users.data} />}
    </main>
  );
}
