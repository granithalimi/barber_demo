import { NextResponse } from "next/server"

export async function POST(request: Request){
  const {selectedS, id} = await request.json()

  if(!selectedS){
    return NextResponse.json({status: 400, message:"Services are required!"})
  }else if(!id){
    return NextResponse.json({status: 400, message:"User Id are required!"})
  }

  console.log(selectedS)
  console.log(id)
  return NextResponse.json({status:200, message:"Successful"})
}
