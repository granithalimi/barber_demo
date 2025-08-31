import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { name, email, submitDate, barber, time } = await request.json()

  if (!name) {
    return NextResponse.json({ error: "Name is undefined" }, { status: 400 })
  } else if (!email) {
    return NextResponse.json({ error: "Email is undefined" }, { status: 400 })
  } else if (!submitDate) {
    return NextResponse.json({ error: "Date is undefined" }, { status: 400 })
  } else if (!barber) {
    return NextResponse.json({ error: "Barber is undefined" }, { status: 400 })
  } else if (!time) {
    return NextResponse.json({ error: "Time is undefined" }, { status: 400 })
  }

  const supabase = await createClient();
  const { error } = await supabase.from("appointments").insert({
    date: submitDate,
    time: time,
    status: "booked",
    name: name,
    email: email,
    barber_id: barber,
  });
  if (error) {
    return NextResponse.json({ error: error }, { status: 400 })
  }

  return NextResponse.json({ message:"Appointment created successfully" }, { status: 200 })
}
