import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const today = new Date().toLocaleDateString("en-CA");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .filter("date", "<", today);

  if (data) console.log(data);
  if (error) console.log(error);
  return NextResponse.json({ message: "Hello" }, { status: 200 });
}
