"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login fail ho gaya.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm flex flex-col gap-4">
      <label className="text-sm text-muted">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg bg-surface2 border border-line px-3.5 py-2.5 text-paper outline-none focus:border-amber transition-colors"
          placeholder="••••••••"
          required
        />
      </label>

      {error && <p className="text-sm text-coral">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-amber text-ink font-medium py-2.5 hover:brightness-105 transition disabled:opacity-60"
      >
        {loading ? "Checking..." : "Login"}
      </button>
    </form>
  );
}
