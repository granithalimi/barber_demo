import AllAppointments from "@/components/all-appointments";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import PastAppointments from "@/components/past-appointments";
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
    .from("profiles")
    .select("role, id")
    .eq("user_id", auth.data?.user?.id)
    .single();

  if (data?.role !== "admin" && data?.role !== "barber") {
    redirect("/");
  }

  const all_apps =
    data?.role == "admin"
      ? await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .order("date", { ascending: true })
        .order("time", { ascending: true })
      : await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .eq("barber_id", data?.id)
        .order("date", { ascending: true })
        .order("time", { ascending: true });

  const today = new Date().toLocaleDateString("en-CA");
  const tapps =
    data?.role == "admin"
      ? await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .eq("date", today)
        .order("time", { ascending: true })
      : await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .eq("date", today)
        .eq("barber_id", data?.id)
        .order("time", { ascending: true });

  const papps =
    data?.role == "admin"
      ? await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .lt("date", today)
        .order("time", { ascending: true })
      : await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .lt("date", today)
        .eq("barber_id", data?.id)
        .order("time", { ascending: true });

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen text-white">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>

      {all_apps.data && all_apps.data.length > 0 ? (
        <>
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            Todays Appointments
          </h1>
          <TodaysAppointments role={data?.role} tapps={tapps?.data} />
          <hr className="my-10 w-11/12 md:w-2/3 mx-auto border-gray-400" />
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            All Appointments
          </h1>
          <AllAppointments role={data?.role} apps={all_apps.data} />
          <hr className="my-10 w-11/12 md:w-2/3 mx-auto border-gray-400" />
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            Past Appointments(Recommend Deleting)
          </h1>
          <PastAppointments papps={papps?.data} />
          <Footer />
        </>
      ) : (
        <h1 className={`${montserrat.className} text-xl text-center`}>
          No Appointments yet :(
        </h1>
      )}
    </main>
  );
}
