import Header from "@/components/header/header";
import { montserrat } from "@/fonts/font";
import { formatDate } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();

  const email = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("appointments")
    .select("*, profiles(name)")
    .eq("email", email.data?.user?.email);
  if (error) console.log(error);

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      {data && data.length > 0 ? (
        <>
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            My Appointments
          </h1>
          <div className="mx-auto w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data.map((a, ind) => {
              const formattedDate = formatDate(a.date);
              return (
                <div
                  className={`${a.status == "accepted" && "bg-green-500"} flex flex-col gap-3 p-5 rounded-lg border border-white text-base`}
                  key={ind}
                >
                  <div className="flex-col md:gap-3">
                    <p className="font-extrabold text-center uppercase">
                      {a.status == "booked" ? ("pending") : a.status}
                    </p>
                    <p>
                      <span className="font-extrabold">Data:</span>{" "}
                      {formattedDate}
                    </p>
                    <p>
                      <span className="font-extrabold">Ora:</span> {a.time}
                    </p>
                    <p>
                      <span className="font-extrabold">Barber:</span>{" "}
                      {a.profiles.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
            No Appointments Yet
          </h1>
          <Link
            href={"/book"}
            className="px-3 py-1 text-white font-bold rounded-lg bg-black hover:bg-white hover:text-black duration-300"
          >
            Book Appointment here
          </Link>
        </div>
      )}
    </main>
  );
}
