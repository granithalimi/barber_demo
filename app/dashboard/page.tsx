import AllAppointments from "@/components/all-appointments";
import Header from "@/components/header/header";
import TodaysAppointments from "@/components/todays-appointments";
import { montserrat } from "@/fonts/font";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  // get auth user_id
  const auth = await supabase.auth.getUser();

  // get user role by id
  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", auth.data?.user?.id)
    .single();
  if (data?.role !== "admin") {
    redirect("/");
  }

  const app = await supabase
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>

      {app.data && app.data.length > 0 ? (
        <>
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            Todays Appointments
          </h1>
          <TodaysAppointments />
          <hr className="my-5 w-11/12 md:w-2/3 mx-auto border-gray-400" />
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            All Appointments
          </h1>
          <AllAppointments apps={app.data} />
        </>
      ) : (
        <h1 className={`${montserrat.className} text-xl text-center`}>
          No Appointments yet :(
        </h1>
      )}
    </main>
  );
}
