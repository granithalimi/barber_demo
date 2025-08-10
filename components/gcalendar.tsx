"use client";
import { static_times } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Time = {
  time: string;
  status: string;
};

export default function Gcalendar() {
  const [times, setTimes] = useState<Time[] | undefined>();

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleButtonClick = (clickedTime: string) => {
    setTime(clickedTime);
  };

  useEffect(() => {
    const supabase = createClient();
    const fetchingDate = date.toLocaleDateString("en-CA");
    setTimes(static_times);
    async function fetchData() {
      const { data } = await supabase
        .from("appointments")
        .select("time, status")
        .eq("date", fetchingDate);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          setTimes((prev) =>
            (prev ?? []).map((obj) =>
              obj.time === data[i].time
                ? { ...obj, status: data[i].status }
                : obj,
            ),
          );
        }
      }
    }

    setTime("")
    fetchData();
  }, [date]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <div className="flex items-center gap-1">
          <div className="p-2 bg-transparent border border-white rounded-full"></div>
          <h1>Not Booked</h1>
        </div>
        <div className="flex items-center gap-1">
          <div className="p-2 bg-gray-500 rounded-full"></div>
          <h1>Booked, pending</h1>
        </div>
        <div className="flex items-center gap-1">
          <div className="p-2 bg-red-500 rounded-full"></div>
          <h1>Booked, accepted</h1>
        </div>
      </div>

      {/* Calendar */}
      <form onSubmit={handleSubmit}>
        <Calendar
          minDate={new Date()}
          maxDate={maxDate}
          onChange={(e) => {
            if (e instanceof Date) {
              setDate(e);
            }
          }}
          tileDisabled={({ date }) => date.getDay() === 0} // 0 = Sunday
          className="rounded-lg p-3 !bg-transparent mt-5 mb-10"
        />
        {times && times.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {times.map((t, ind) => {
              if (t.status == "pending") {
                return (
                  <button
                    className={`${time == t.time ? "scale-110 bg-white text-black font-bold" : "hover:scale-110 hover:bg-white hover:text-black hover:font-bold"} 
                    py-1 border border-white rounded-lg duration-300`}
                    type="button"
                    key={ind}
                    onClick={() => handleButtonClick(t.time)}
                  >
                    {t.time.slice(0, 5)}
                  </button>
                );
              } else if (t.status == "booked") {
                return (
                  <button
                    className={`${time == t.time ? "scale-110 bg-white text-black font-bold" : "hover:scale-110 hover:bg-white hover:text-black hover:font-bold"} 
                    py-1 rounded-lg bg-gray-400 text-black duration-300`}
                    type="button"
                    key={ind}
                    onClick={() => handleButtonClick(t.time)}
                  >
                    {t.time.slice(0, 5)}
                  </button>
                );
              } else {
                return (
                  <button
                    onClick={() => alert("This specific time is booked!")}
                    className="py-1 rounded-lg bg-red-500"
                    type="button"
                    key={ind}
                  >
                    {t.time.slice(0, 5)}
                  </button>
                );
              }
            })}
          </div>
        )}
        <div className="flex flex-col items-center gap-3 my-10">
          <div className="flex flex-col w-full">
            <label>Name:</label>
            <input
              type="text"
              className="py-1 px-2 rounded-lg bg-transparent border border-white w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Email:</label>
            <input
              type="email"
              className="py-1 px-2 rounded-lg bg-transparent border border-white w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Password:</label>
            <input
              type="password"
              className="py-1 px-2 rounded-lg bg-transparent border border-white w-full"
            />
          </div>
          <button
            className="bg-red-500 px-3 py-1 rounded-lg font-bold hover:bg-red-400 duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
