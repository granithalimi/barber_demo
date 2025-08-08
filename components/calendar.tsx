"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Ccalendar() {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const supabase = createClient()
    async function fetchData(){
      const {data, error} = await supabase.from("appointments").select()
      if(data) console.log(data)
      if(error) console.log(error)
    }

    fetchData()
  }, [date])
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
      <form>
        <Calendar
          minDate={new Date()}
          onChange={(e) => {
            if(e instanceof Date){
              setDate(e)
            }
          }}
          className="rounded-lg p-3 !bg-transparent mt-5 mb-10"
        />
        <div>
          <button type="button">test</button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
