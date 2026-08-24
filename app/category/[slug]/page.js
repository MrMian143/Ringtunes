import Link from "next/link";
import { getRingtones } from "@/lib/data";
import RingtoneRow from "@/components/RingtoneRow";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }) {
  const category = decodeURIComponent(params.slug);
  const all = await getRingtones();
  const items = all.filter((r) => r.category === category);

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <Link href="/" className="text-sm text-muted hover:text-paper transition-colors">
        ← Categories
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl font-bold capitalize mt-4 mb-8">
        {category}
      </h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line px-6 py-14 text-center text-muted">
          Is category mein abhi koi ringtone nahi hai.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((r) => (
            <RingtoneRow key={r.id} ringtone={r} />
          ))}
        </div>
      )}
    </div>
  );
}
