/* eslint-disable prefer-const */
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, submitDate, barber, time, service } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required!" }, { status: 400 });
  } else if (!email) {
    return NextResponse.json({ error: "Email is required!" }, { status: 400 });
  } else if (!submitDate) {
    return NextResponse.json({ error: "Date is required!" }, { status: 400 });
  } else if (!barber) {
    return NextResponse.json({ error: "Barber is required!" }, { status: 400 });
  } else if (!time) {
    return NextResponse.json({ error: "Time is required!" }, { status: 400 });
  } else if (!service) {
    return NextResponse.json({ error: "Service is required!" }, { status: 400 });
  }

  const supabase = await createClient();
  const single_service = await supabase.from("services").select("name, time").eq("id", service).single()

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      date: submitDate,
      time: time,
      status: "booked",
      name: name,
      email: email,
      barber_id: barber,
      service: single_service.data?.name,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  // Create Calendar Apps
  let [hours, minutes, seconds] = time.split(":").map(Number);
  for (let i = 0; i < Number(single_service.data?.time); i++) {
    const res = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

    const calendar_apps = await supabase
      .from("calendar_appointments")
      .insert({
        date: submitDate,
        time: res,
        status: "booked",
        barber_id: barber,
        app_id: data[0].id,
      });
    if (calendar_apps?.error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    // Add 30mins
    let totalMinutes = hours * 60 + minutes + 30;
    hours = Math.floor(totalMinutes / 60) % 24;
    minutes = totalMinutes % 60;
  }


  return NextResponse.json(
    {
      message:
        "Appointment created successfully, We'll send you and email for approval✂️",
    },
    { status: 200 },
  );
}
