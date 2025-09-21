import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase.from("services").delete().eq("id", id);

  if(error){
    return NextResponse.json({status: 400, message: error})
  }

  return NextResponse.json({status: 200, message: data})
}
