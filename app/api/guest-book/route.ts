import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone, submitDate, time, barber } = await request.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is Required" }, { status: 400 });
  } else if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is Required" }, { status: 400 });
  } else if (!submitDate) {
    return NextResponse.json({ error: "Date is Required" }, { status: 400 });
  } else if (!time) {
    return NextResponse.json({ error: "Time is Required" }, { status: 400 });
  } else if (!barber) {
    return NextResponse.json({ error: "Barber is Required" }, { status: 400 });
  }

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("appointments").insert({
      date: submitDate,
      time: time,
      status: "booked",
      name: name,
      email: email,
      phone: phone,
      barber_id: barber,
    });
    if (error) throw error;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went Wrong", error: error },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Appointment created successfully" },
    { status: 200 },
  );
}
