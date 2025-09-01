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

  const app = await supabase
    .from("appointments")
    .select("email, name, date, time, phone")
    .eq("id", id)
    .single();

  const email = app?.data?.email;
  const name = app?.data?.name;
  const date = app?.data?.date;
  const time = app?.data?.time;
  const phone = app?.data?.phone;

  // Send email
  const email_sent = await resend.emails.send({
    from: "BarberShop <barbershop@snap-sending.space>",
    to: email,
    subject: "Your Fresh Haircut Awaits ✂️",
    html: html(name, date, time),
  });

  if (email_sent.error) console.log(email_sent.error);

  await fetch(
    `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        phone,
        type: "text",
        text: {
          body: `You’re booked in, looking sharp already ✂️
            Hey ${name},
            Your appointment at Snap Barbershop has been accepted. We can’t wait to give you a fresh cut that’ll have you walking out feeling brand new.
            📅 Date:${date}
            ⏰ Time:${time}
            `},
      }),
    }
  );

  return NextResponse.json(
    { message: "Appointment accepted" },
    { status: 200 },
  );
}
