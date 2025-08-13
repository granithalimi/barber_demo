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
};

export default function TodaysAppointments() {
  const today = new Date().toLocaleDateString("en-CA");
  const [apps, setApps] = useState<Appointment[]>();

  useEffect(() => {
    const fetchTodayApps = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("date", today)
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

  const handleAccept = (id: number) => {
    async function accept() {
      const supabase = createClient();
      const { error } = await supabase
        .from("appointments")
        .update({ status: "accepted" })
        .eq("id", id);
      if (error) {
        console.log(error);
        return;
      }
      window.location.reload();
    }

    accept();
  };

  const handleDecline = (id: number) => {
    async function decline() {
      const supabase = createClient();
      const { error } = await supabase
        .from("appointments")
        .update({ status: "booked" })
        .eq("id", id);
      if (error) {
        console.log(error);
        return;
      }
      window.location.reload();
    }

    decline();
  };
  return (
    <div className="mx-auto w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
              </div>
              <div className="flex justify-center gap-1 md:gap-3 items-center">
                {a.status == "accepted" ? (
                  <button
                    className="px-2 py-1 rounded-lg text-base text-white bg-orange-400 hover:bg-orange-600 duration-300"
                    onClick={() => handleDecline(a.id)}
                  >
                    Decline
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 rounded-lg text-base text-white bg-green-400 hover:bg-green-500 duration-300"
                    onClick={() => handleAccept(a.id)}
                  >
                    Accept
                  </button>
                )}
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
        <h1 className="text-center">No Appointments due today</h1>
      )}
    </div>
  );
}
