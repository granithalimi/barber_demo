/* eslint-disable prefer-const */
import { static_services } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, submitDate, time, barber, service } =
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
  const single_service = static_services.find((s) => s.id == service);

  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        date: submitDate,
        time: time,
        status: "booked",
        name: name,
        email: email,
        barber_id: barber,
        service: single_service?.name,
      })
      .select();
    if (error) throw error;

    // Calendar Apps
    let [hours, minutes, seconds] = time.split(":").map(Number);
    for (let i = 0; i < Number(single_service?.time); i++) {
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
      if (calendar_apps?.error) throw calendar_apps.error;

      // Add 30mins
      let totalMinutes = hours * 60 + minutes + 30;
      hours = Math.floor(totalMinutes / 60) % 24;
      minutes = totalMinutes % 60;
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
