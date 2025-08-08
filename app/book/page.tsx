import Ccalendar from "@/components/calendar";
import Header from "@/components/header/header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient()
  const {data, error} = await supabase.auth.getUser()
  if(error || !data?.user){
    redirect("/book_as_guest")
  }

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <h1 className="text-center">welcome in the booking system</h1>

      <Ccalendar />
    </main>
  );
}
