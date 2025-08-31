"use client";
import { poppins } from "@/fonts/font";
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
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [barbers, setBarbers] = useState<{ name: string; id: number }[]>();

  // Submiting Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [barber, setBarber] = useState<string | null>();

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    const submitDate = date.toLocaleDateString("en-CA");
    const response = await fetch("/api/guest-book", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, submitDate, time, barber }),
    });

    if (!response.ok) {
      const data = await response.json()
      console.log("error", data.error);
      return;
    }

    setShowMessage(true);
    setDate(new Date());
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
        .eq("date", fetchingDate)
        .eq("barber_id", barber);
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

    async function fetchBarbers() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("name, id")
        .eq("role", "barber");
      if (data) {
        setBarbers(data);
      }
    }

    setTime("");
    fetchBarbers();
    fetchData();
  }, [date, barber]);

  return (
    <div className="mt-10 flex flex-col items-center">
      {barbers && barbers.length > 0 && (
        <div className={`flex items-center gap-3 mb-3`}>
          <h1 className={`${poppins.className} py-1`}>Select your Barber:</h1>
          <select
            onChange={(e) => setBarber(e.target.value)}
            className="py-1 px-3 rounded-lg"
          >
            <option>---</option>
            {barbers.map((b, ind) => (
              <option value={b.id} key={ind}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div
        className={`${showMessage ? "fixed" : "hidden"} left-1/2 top-1/2 w-2/3 md:w-auto z-50 bg-white rounded-lg flex flex-col items-end gap-3 text-black px-6 py-4 shadow-black/80 shadow-lg`}
        style={{ transform: "translate(-50%)" }}
      >
        <h1 className="text-center">Appointment created successfully!</h1>
        <button
          className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-900"
          onClick={() => {
            setShowMessage(false);
            window.location.reload();
          }}
        >
          Close
        </button>
      </div>
      {barber && (
        <>
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
                  required
                  placeholder="John Smith"
                  className="py-1 px-2 rounded-lg bg-transparent border border-white w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Email:</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="py-1 px-2 rounded-lg bg-transparent border border-white w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Phone:</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+389 123456789"
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
        </>
      )}
    </div>
  );
}
