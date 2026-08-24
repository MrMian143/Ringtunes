import { requireAuthOr401 } from "@/lib/auth";
import { addRingtone } from "@/lib/data";

export async function POST(request) {
  const unauthorized = requireAuthOr401();
  if (unauthorized) return unauthorized;

  const { title, category, audioUrl } = await request.json();

  const cleanTitle = (title || "").toString().trim();
  const cleanCategory = (category || "").toString().trim().toLowerCase();

  if (!cleanTitle || !cleanCategory) {
    return Response.json({ error: "Title aur category zaroori hain." }, { status: 400 });
  }
  if (!audioUrl || typeof audioUrl !== "string" || !audioUrl.includes(".blob.vercel-storage.com")) {
    return Response.json({ error: "Audio upload nahi mila. Dobara try karein." }, { status: 400 });
  }

  const entry = {
    id: crypto.randomUUID(),
    title: cleanTitle,
    category: cleanCategory,
    audioUrl,
    createdAt: Date.now(),
  };

  await addRingtone(entry);

  return Response.json({ ok: true, ringtone: entry });
}
