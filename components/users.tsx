"use client";

import { montserrat } from "@/fonts/font";
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

  const handleMakeBarberClick = () => {
    console.log("made barber");
  };

  const handleMakeClientClick = () => {
    console.log("made client");
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
                  <h1>{u.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  {u.role == "client" ? (
                    <button
                      onClick={() => handleMakeBarberClick()}
                      className="bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-400 duration-300"
                    >
                      +Barber
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeClientClick()}
                      className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-400 duration-300"
                    >
                      -Barber
                    </button>
                  )}
                  <h1>{u.role}</h1>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
