"use client";

import { formatDate } from "@/lib/helpers";
import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  date: string;
  time: string;
  status: string;
  name: string;
  email: string;
  service: string;
  profiles: { name: string };
};

export default function AllAppointments({
  apps,
  role,
}: {
  apps: Appointment[];
  role: string;
}) {
  const [appointments, setAppoinments] = useState<Appointment[]>();

  useEffect(() => {
    setAppoinments(apps);
  }, [apps]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this Appointment?")) {
      try {
        const response = await fetch("/api/delete-appointment", {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAccept = async (id: number) => {
    if (confirm("Are you sure you want to accept this Appointment?")) {
      try {
        const response = await fetch("/api/accept-appointment", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDecline = async (id: number) => {
    if (confirm("Are you sure you want to delete this Appointment?")) {
      try {
        const response = await fetch("/api/decline-appointment", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="mx-auto w-11/12 md:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {appointments &&
        appointments.length > 0 &&
        appointments.map((a, ind) => {
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
                  <span className="font-extrabold">Service:</span> {a.service}
                </p>
                <p>
                  <span className="font-extrabold">Barber:</span>{" "}
                  {a.profiles.name}
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
                {role == "admin" && (
                  <button
                    className="px-2 py-1 rounded-lg text-base text-white bg-red-600 hover:bg-red-700 duration-300"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
