export async function GET() {
  console.log("Cron ran at:", new Date().toISOString())
  return new Response('Cron job completed', { status: 200 });
}
