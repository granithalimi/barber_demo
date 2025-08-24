import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
  console.log("Cron ran at:", new Date().toISOString())
  return NextResponse.json({message:"Hello"}, {status: 200});
}
