import Link from "next/link";

export default function LegalPage({ title, updated, children }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <Link href="/" className="text-sm text-muted hover:text-paper transition-colors">
        ← Home
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-2">
        {title}
      </h1>
      {updated && (
        <p className="text-xs text-muted font-mono mb-8">Last updated: {updated}</p>
      )}

      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-paper/90 [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-lg [&_h2]:text-paper [&_h2]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_a]:text-amber [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
