import { requireAuthOr401 } from "@/lib/auth";
import { uploadAudio, addRingtone } from "@/lib/data";

// Vercel Functions have a hard ~4.5MB request body limit. Client-direct
// uploads (browser straight to Blob storage) are currently broken by a
// Vercel platform-side CORS bug affecting handleUpload's token exchange
// (reported on Vercel's own community forum, confirmed as needing internal
// investigation on their end — not something fixable from application
// code). Until that's resolved, uploads are proxied through this route
// instead, which caps file size well under the Function body limit.
const MAX_SIZE = 4 * 1024 * 1024; // ~4MB, safely under Vercel's 4.5MB limit

export async function POST(request) {
  const unauthorized = requireAuthOr401();
  if (unauthorized) return unauthorized;

  let form;
  try {
    form = await request.formData();
  } catch (err) {
    console.error("upload/route: failed to parse form data", err);
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }

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
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "File 4MB se choti honi chahiye." }, { status: 400 });
  }

  try {
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
  } catch (err) {
    console.error("upload/route: upload failed:", err);
    const message = err instanceof Error ? err.message : "Upload fail ho gaya.";
    return Response.json({ error: message }, { status: 500 });
  }
}
