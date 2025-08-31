import Acalendar from "@/components/acalendar";
import Header from "@/components/header/header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/book_as_guest");
  }

  const user_data = await supabase
    .from("profiles")
    .select("name, phone")
    .eq("user_id", data?.user?.id)
    .single()

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>

      <Acalendar name={user_data?.data?.name} email={data?.user?.email} phone={user_data?.data?.phone} />
      <div className="pb-28"></div>
      {/* <Footer /> */}
    </main>
  );
}
