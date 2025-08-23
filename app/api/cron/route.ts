import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  
  console.log("Cron Job ran at: ", new Date())
  return new Response('cron ran', {status: 200})
}
