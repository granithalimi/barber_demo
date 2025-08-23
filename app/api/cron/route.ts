export async function GET(){
  
  console.log("Cron Job ran at: ", new Date())
  return new Response('cron ran', {status: 200})
}
