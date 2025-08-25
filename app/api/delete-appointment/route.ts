import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id || typeof id !== "number") {
    return NextResponse.json({ message: "Not a Valid ID", status: 400 });
  }

  const supabase = await createClient();

  // check user auth
  const auth = await supabase.auth.getUser();
  if (auth?.error || !auth?.data?.user) {
    return NextResponse.json(
      { error: "User isnt authenticated" },
      { status: 400 },
    );
  }

  // check user role
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

  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ message: "Not a Valid ID", status: 400 });
  }
  return NextResponse.json({
    message: "Appointment Deleted Successfully",
    status: 200,
  });
}
