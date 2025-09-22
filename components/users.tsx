"use client";

import { montserrat } from "@/fonts/font";
// import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  user_id: string;
  name: string;
  role: string;
};
export default function Users({ users }: { users: User[] }) {
  const [allUsers, setAllUsers] = useState<User[]>();

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  // const handleMakeBarberClick = async (id: string) => {
  //   const supabase = createClient();
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({ role: "barber" })
  //     .eq("user_id", id);
  //
  //
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     window.location.reload();
  //   }
  // };

  // const handleMakeClientClick = async (id: string) => {
  //   const supabase = createClient();
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({ role: "client" })
  //     .eq("user_id", id);
  //
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     window.location.reload();
  //   }
  // };

  const handleUserDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    window.location.reload();
  };

  return (
    <>
      <h1 className={`${montserrat.className} text-center text-2xl mb-5`}>
        All Users
      </h1>
      <div className="flex flex-col gap-3">
        {allUsers && allUsers.length > 0 && (
          <>
            {allUsers.map((u, ind) => (
              <div
                key={ind}
                className="mx-auto px-6 py-2 rounded-lg border border-white flex justify-between w-11/12 md:w-2/3"
              >
                <div className="flex items-center gap-2">
                  <h1>{u.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUserDelete(u.user_id)}
                    className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-400 duration-300"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/all_users/${u.user_id}`}
                    // onClick={() => handleMakeBarberClick(u.user_id)}
                    className="bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-400 duration-300"
                  >
                    Edit
                  </Link>
                  <h1 className="uppercase">{u.role}</h1>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
