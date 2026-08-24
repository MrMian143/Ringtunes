import Link from "next/link";
import { getRingtones, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

const ICONS = {
  bollywood: "🎬",
  islamic: "🕌",
  funny: "😂",
  romantic: "💛",
  instrumental: "🎹",
  english: "🎧",
  punjabi: "🥁",
  notification: "🔔",
};

function iconFor(name) {
  return ICONS[name.toLowerCase()] || "🎵";
}

export default async function HomePage() {
  const ringtones = await getRingtones();
  const categories = getCategories(ringtones);

  return (
    <div className="max-w-5xl mx-auto px-5">
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="flex items-end gap-1 h-10 mb-6">
          <span className="w-1.5 bg-amber rounded-full animate-bar1 h-4" />
          <span className="w-1.5 bg-violet rounded-full animate-bar2 h-8" />
          <span className="w-1.5 bg-coral rounded-full animate-bar3 h-5" />
          <span className="w-1.5 bg-amber rounded-full animate-bar4 h-10" />
          <span className="w-1.5 bg-violet rounded-full animate-bar1 h-6" />
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl">
          Sunain, phir download karein.
        </h1>
        <p className="text-muted mt-4 text-base sm:text-lg max-w-lg">
          Category chunain, apni pasand ki ringtone play karein, aur ek tap mein
          save kar lein — bilkul free.
        </p>
      </section>

      <section className="pb-24">
        <h2 className="font-display font-medium text-sm uppercase tracking-widest text-muted mb-4">
          Categories
        </h2>

        {categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line px-6 py-14 text-center text-muted">
            <p className="font-display text-lg text-paper mb-1">Abhi koi ringtone nahi hai</p>
            <p className="text-sm">Admin panel se ringtones add karein, ye yahan aa jayengi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = ringtones.filter((r) => r.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="group rounded-2xl border border-line/60 bg-surface/60 p-5 hover:border-amber/50 hover:bg-surface2 transition-colors"
                >
                  <span className="text-2xl">{iconFor(cat)}</span>
                  <p className="font-display font-medium mt-3 capitalize">{cat}</p>
                  <p className="text-xs text-muted mt-1 font-mono">
                    {count} tone{count !== 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
