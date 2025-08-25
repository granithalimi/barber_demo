import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id } = await request.json(); 
    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { error: "Valid ID is required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("appointments")
      .update({ status: "accepted" })
      .eq("id", id);
    if(error) throw(error)
    return NextResponse.json(
      { receivedId: id, message: "Appointment accepted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
