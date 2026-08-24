import { requireAuthOr401 } from "@/lib/auth";
import { removeRingtone } from "@/lib/data";

export async function POST(request) {
  const unauthorized = requireAuthOr401();
  if (unauthorized) return unauthorized;

  const { id } = await request.json();
  if (!id) return Response.json({ error: "id zaroori hai." }, { status: 400 });

  await removeRingtone(id);
  return Response.json({ ok: true });
}
