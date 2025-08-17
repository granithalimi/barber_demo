"use client";

import { formatDate } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  date: string;
  time: string;
  status: string;
  name: string;
  email: string;
  profiles: {name: string};
};

export default function PastAppointments() {
  const today = new Date().toLocaleDateString("en-CA");
  const [apps, setApps] = useState<Appointment[]>();

  useEffect(() => {
    const fetchTodayApps = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("appointments")
        .select("*, profiles(name)")
        .lt("date", today)
        .order("time", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      setApps(data);
    };

    fetchTodayApps();
  }, [today]);

  const handleDelete = (id: number) => {
    async function del() {
      const supabase = createClient();
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
        return;
      }
      window.location.reload();
    }

    del();
  };

  return (
    <div className="mx-auto pb-10 w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {apps && apps.length > 0 ? (
        apps.map((a, ind) => {
          const formattedDate = formatDate(a.date);
          return (
            <div
              className={`${a.status == "accepted" && "bg-green-500"} flex flex-col gap-3 p-5 rounded-lg border border-white text-base`}
              key={ind}
            >
              <div className="flex-col md:gap-3">
                <p className="font-extrabold text-center">{a.name}</p>
                <p>
                  <span className="font-extrabold">Data:</span> {formattedDate}
                </p>
                <p>
                  <span className="font-extrabold">Ora:</span> {a.time}
                </p>
                <p>
                  <span className="font-extrabold">Barber:</span> {a.profiles?.name}
                </p>
              </div>
              <div className="flex justify-center gap-1 md:gap-3 items-center">
                <button
                  className="px-2 py-1 rounded-lg text-base text-white bg-red-600 hover:bg-red-700 duration-300"
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-center">No Appointments past today</h1>
      )}
    </div>
  );
}
