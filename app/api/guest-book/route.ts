/* eslint-disable prefer-const */
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, submitDate, time, barber, service, lastTime } =
    await request.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is Required!" }, { status: 400 });
  } else if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is Required!" }, { status: 400 });
  } else if (!submitDate) {
    return NextResponse.json({ error: "Date is Required!" }, { status: 400 });
  } else if (!time) {
    return NextResponse.json({ error: "Time is Required!" }, { status: 400 });
  } else if (!barber) {
    return NextResponse.json({ error: "Barber is Required!" }, { status: 400 });
  } else if (!service) {
    return NextResponse.json(
      { error: "Service is Required!" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const single_service = await supabase.from("services").select("name, time").eq("id", service).single()

  try {
    // Check TIME!!
    let [hours, minutes, seconds] = time.split(":").map(Number);
    for (let i = 0; i < Number(single_service.data?.time); i++) {
      const res = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

      if (res > lastTime) {
        return NextResponse.json({ status: 400, message: `The latest available appointment with your barber is at ${lastTime}. Please select a different time.` });
      }
      const calendar_apps = await supabase
        .from("calendar_appointments")
        .select("status")
        .eq("barber_id", barber)
        .eq("time", res)
        .eq("status", "accepted")
      if (calendar_apps?.error) throw calendar_apps.error;
      if (calendar_apps?.data && calendar_apps?.data.length > 0) {
        return NextResponse.json({ status: 400, message: `Your haircut takes ${single_service.data?.time * 30}min! Please choose a different time when the barber is more available!` });
      }

      // Add 30mins
      let totalMinutes = hours * 60 + minutes + 30;
      hours = Math.floor(totalMinutes / 60) % 24;
      minutes = totalMinutes % 60;

    }

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
    if (error) throw error;

    // Calendar Apps
    let [hours2, minutes2, seconds2] = time.split(":").map(Number);
    for (let i = 0; i < Number(single_service.data?.time); i++) {
      const res = `${String(hours2).padStart(2, "0")}:${String(minutes2).padStart(2, "0")}:${String(seconds2).padStart(2, "0")}`

      const calendar_apps = await supabase
        .from("calendar_appointments")
        .insert({
          date: submitDate,
          time: res,
          status: "booked",
          barber_id: barber,
          app_id: data[0].id,
        });
      if (calendar_apps?.error) throw calendar_apps.error;

      // Add 30mins
      let totalMinutes2 = hours2 * 60 + minutes2 + 30;
      hours2 = Math.floor(totalMinutes2 / 60) % 24;
      minutes2 = totalMinutes2 % 60;
    }

  } catch (error) {
    return NextResponse.json(
      { message: "Something went Wrong", error: error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Appointment created successfully, We'll send you and email for approval✂️",
    },
    { status: 200 },
  );
}
