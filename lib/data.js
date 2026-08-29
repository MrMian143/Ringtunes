import { put, list, del } from "@vercel/blob";

const DB_PATH = "db/ringtones.json";

// Reads the ringtones database (an array of ringtone objects) from Blob.
// Returns an empty array if it doesn't exist yet.
export async function getRingtones() {
  try {
    const { blobs } = await list({ prefix: DB_PATH, limit: 1 });
    const dbBlob = blobs.find((b) => b.pathname === DB_PATH);
    if (!dbBlob) return [];

    const res = await fetch(dbBlob.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getRingtones error:", err);
    return [];
  }
}

// Overwrites the database file with the given array.
export async function saveRingtones(ringtones) {
  await put(DB_PATH, JSON.stringify(ringtones, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// Uploads an audio file to Blob storage and returns its public URL.
// Runs server-side via put() — authenticates automatically via OIDC on Vercel.
export async function uploadAudio(file) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await put(`audio/${Date.now()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

// Deletes an audio file from Blob storage.
export async function deleteAudio(url) {
  try {
    await del(url);
  } catch (err) {
    console.error("deleteAudio error:", err);
  }
}

export async function addRingtone(entry) {
  const ringtones = await getRingtones();
  ringtones.unshift(entry);
  await saveRingtones(ringtones);
  return entry;
}

export async function removeRingtone(id) {
  const ringtones = await getRingtones();
  const target = ringtones.find((r) => r.id === id);
  const updated = ringtones.filter((r) => r.id !== id);
  await saveRingtones(updated);
  if (target?.audioUrl) await deleteAudio(target.audioUrl);
  return target;
}

export function getCategories(ringtones) {
  const set = new Set(ringtones.map((r) => r.category));
  return Array.from(set).sort();
}
