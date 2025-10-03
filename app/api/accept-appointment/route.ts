import { html } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { id } = await request.json();
  if (!id || typeof id !== "number") {
    return NextResponse.json(
      { error: "Valid ID is required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  // check if user is authenticated
  const auth = await supabase.auth.getUser();
  if (auth?.error || !auth?.data?.user) {
    return NextResponse.json(
      { error: "User isnt authenticated" },
      { status: 400 },
    );
  }

  // check if user is admin or barber
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", auth.data?.user?.id)
    .single();

  if (data?.role !== "admin" && data?.role !== "barber") {
    return NextResponse.json({
      message: "You don't have the specific role for that action",
      status: 400,
    });
  }

  // check for other appointments to this barber!!!

  // update
  const { error } = await supabase
    .from("appointments")
    .update({ status: "accepted" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      message: "Updating error",
      status: 400,
    });
  }

  const calendar_apps = await supabase
    .from("calendar_appointments")
    .update({ status: "accepted" })
    .eq("app_id", id)
    .select("date, time, barber_id");

  if (calendar_apps.data && calendar_apps.data.length > 0) {
    const conditions = calendar_apps.data
      .map(dt => `and(date.eq.${dt.date},time.eq.${dt.time})`)
      .join(",");

    const conflicts = await supabase
      .from("calendar_appointments")
      .select("app_id")
      .eq("barber_id", calendar_apps.data[0].barber_id)
      .neq("app_id", id)
      .or(conditions);

    if (conflicts.data) {
      const errr = await supabase
        .from("appointments")
        .delete()
        .in(
          "id",
          conflicts.data?.flatMap((appointment) => appointment.app_id),
        );
      if (errr.error) console.log(errr.error);
    }

    if (conflicts.error) console.log(conflicts.error);
  }

  if (calendar_apps.error) {
    return NextResponse.json({
      message: "Updating error",
      status: 400,
    });
  }

  const app = await supabase
    .from("appointments")
    .select("email, name, date, time")
    .eq("id", id)
    .single();

  const email = app?.data?.email;
  const name = app?.data?.name;
  const date = app?.data?.date;
  const time = app?.data?.time;

  // Send email
  const email_sent = await resend.emails.send({
    from: "BarberShop <barbershop@snap-sending.space>",
    to: email,
    subject: "Your Fresh Haircut Awaits ✂️",
    html: html(name, date, time),
  });

  if (email_sent.error) console.log(email_sent.error);

  return NextResponse.json(
    { message: "Appointment accepted" },
    { status: 200 },
  );
}
