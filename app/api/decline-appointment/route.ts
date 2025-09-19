import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
    .update({ status: "booked" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      message: "Updating error",
      status: 400,
    });
  }

  const calendar_apps = await supabase
    .from("calendar_appointments")
    .update({ status: "booked" })
    .eq("app_id", id);

  if (calendar_apps.error) {
    return NextResponse.json({
      message: "Updating error",
      status: 400,
    });
  }

  return NextResponse.json(
    { receivedId: id, message: "Appointment Declined" },
    { status: 200 },
  );
}
