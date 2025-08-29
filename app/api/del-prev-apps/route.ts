import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const today = new Date().toLocaleDateString("en-CA");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .lt("date", today)

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
  return NextResponse.json({ message: data }, { status: 200 });
}
