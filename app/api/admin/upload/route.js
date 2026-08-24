import { requireAuthOr401 } from "@/lib/auth";
import { uploadAudio, addRingtone } from "@/lib/data";

export async function POST(request) {
  const unauthorized = requireAuthOr401();
  if (unauthorized) return unauthorized;

  const form = await request.formData();
  const file = form.get("file");
  const title = (form.get("title") || "").toString().trim();
  const category = (form.get("category") || "").toString().trim().toLowerCase();

  if (!file || !(file instanceof File)) {
    return Response.json({ error: "Audio file zaroori hai." }, { status: 400 });
  }
  if (!title || !category) {
    return Response.json({ error: "Title aur category zaroori hain." }, { status: 400 });
  }
  if (!file.type.startsWith("audio/")) {
    return Response.json({ error: "Sirf audio files allowed hain (mp3, m4a, ogg, wav)." }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return Response.json({ error: "File 15MB se choti honi chahiye." }, { status: 400 });
  }

  const audioUrl = await uploadAudio(file);

  const entry = {
    id: crypto.randomUUID(),
    title,
    category,
    audioUrl,
    createdAt: Date.now(),
  };

  await addRingtone(entry);

  return Response.json({ ok: true, ringtone: entry });
}
