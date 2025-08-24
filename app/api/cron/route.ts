// import type { NextRequest } from 'next/server';
 
// export function GET(request: NextRequest) {
//   const authHeader = request.headers.get('authorization');
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response('Unauthorized', {
//       status: 401,
//     });
//   }
//
//   console.log("Cron ran at:", new Date())
//
//   return Response.json({message: "Cron ran at: " + new Date()});
// }
//
export async function GET() {
  console.log("Cron ran at:", new Date().toISOString())
  return new Response('Cron job completed', { status: 200 });
}
