import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { selectedS, selectedW, id } = await request.json();

  if (!selectedS) {
    return NextResponse.json({
      status: 400,
      message: "Services are required!",
    });
  // }else if(!selectedW){
  //   return NextResponse.json({ status: 400, message: "Working Hours are required!" });
  } else if (!id) {
    return NextResponse.json({ status: 400, message: "User Id is required!" });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role: "barber" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ status: 400, message: "User Id is required!" });
  }

  const prev_services = await supabase
    .from("profiles_services")
    .delete()
    .eq("profile_id", id);
  if (prev_services.error) console.log(prev_services.error);

  for (let i = 0; i < selectedS.length; i++) {
    const profile_service = await supabase.from("profiles_services").insert({
      service_id: selectedS[i].service_id,
      profile_id: id,
    });

    if (profile_service.error) {
      return NextResponse.json({ status: 400, message: profile_service.error });
    }
  }

  console.log(selectedW)
  const prev_working_hours= await supabase
    .from("working_hours")
    .delete()
    .eq("barber_id", id);
  if (prev_working_hours.error) console.log(prev_working_hours.error);

  for (let i = 0; i < 6; i++) {
    const working_hours = await supabase.from("working_hours").insert({
      week_day: selectedW[i].week_day,
      start: selectedW[i].start,
      end: selectedW[i].end,
      barber_id: id,
    });

    if (working_hours.error) {
      return NextResponse.json({ status: 400, message: working_hours.error });
    }
  }

  return NextResponse.json({ status: 200, message: "Successful" });
}
