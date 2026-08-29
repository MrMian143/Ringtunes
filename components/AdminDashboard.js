"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard({ initialRingtones }) {
  const router = useRouter();
  const [ringtones, setRingtones] = useState(initialRingtones);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setError("Pehle ek audio file chunain.");
      return;
    }
    setUploading(true);
    setError("");

    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    form.append("category", category);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload fail ho gaya.");
        return;
      }

      setRingtones((prev) => [data.ringtone, ...prev]);
      setTitle("");
      setCategory("");
      setFile(null);
      setFileInputKey((k) => k + 1);
    } catch (err) {
      console.error("Ringtone upload failed:", err);
      setError("Upload fail ho gaya. Dobara try karein.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    const prev = ringtones;
    setRingtones((rs) => rs.filter((r) => r.id !== id));
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) setRingtones(prev);
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleUpload} className="rounded-2xl border border-line/60 bg-surface/60 p-5 flex flex-col gap-4">
        <p className="font-display font-medium">Nayi ringtone add karein</p>

        <label className="text-sm text-muted">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 w-full rounded-lg bg-surface2 border border-line px-3.5 py-2.5 text-paper outline-none focus:border-amber transition-colors"
            placeholder="e.g. Eid Mubarak Tone"
            required
          />
        </label>

        <label className="text-sm text-muted">
          Category
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-lg bg-surface2 border border-line px-3.5 py-2.5 text-paper outline-none focus:border-amber transition-colors"
            placeholder="e.g. islamic, bollywood, funny"
            required
          />
        </label>

        <label className="text-sm text-muted">
          Audio file (mp3, m4a, ogg — max 4MB)
          <input
            key={fileInputKey}
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1.5 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-surface2 file:px-3.5 file:py-2 file:text-paper"
            required
          />
        </label>

        {error && <p className="text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-amber text-ink font-medium py-2.5 hover:brightness-105 transition disabled:opacity-60"
        >
          {uploading ? "Upload ho raha hai..." : "Upload karein"}
        </button>
      </form>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-display font-medium">Sab ringtones ({ringtones.length})</p>
          <button onClick={handleLogout} className="text-sm text-muted hover:text-paper transition-colors">
            Logout
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {ringtones.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 rounded-xl border border-line/60 bg-surface/60 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{r.title}</p>
                <p className="text-xs text-muted capitalize">{r.category}</p>
              </div>
              <button
                onClick={() => handleDelete(r.id)}
                className="text-xs text-coral border border-coral/40 rounded-lg px-3 py-1.5 hover:bg-coral hover:text-ink transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
          {ringtones.length === 0 && (
            <p className="text-sm text-muted">Abhi koi ringtone nahi hai.</p>
          )}
        </div>
      </div>
    </div>
  );
}
