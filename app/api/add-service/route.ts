import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, price, time } = await request.json();

  if (!name) {
    return NextResponse.json({ status: 400, message: "Name Required" });
  } else if (!price) {
    return NextResponse.json({ status: 400, message: "Price Required" });
  } else if (!time) {
    return NextResponse.json({ status: 400, message: "Time Required" });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("services").insert({
    name: name,
    price: price,
    time: Math.floor(time / 30),
  });

  if (error) {
    return NextResponse.json({ status: 400, message: error });
  }

  return NextResponse.json({ status: 200, message: data });
}
