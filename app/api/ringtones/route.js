import { getRingtones } from "@/lib/data";

export async function GET() {
  const ringtones = await getRingtones();
  return Response.json({ ringtones });
}
