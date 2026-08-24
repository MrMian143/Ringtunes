import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line/60 sticky top-0 z-30 backdrop-blur bg-ink/80">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex items-end gap-[3px] h-5">
            <span className="w-[3px] bg-amber rounded-full animate-bar1 h-2" />
            <span className="w-[3px] bg-violet rounded-full animate-bar2 h-4" />
            <span className="w-[3px] bg-coral rounded-full animate-bar3 h-3" />
            <span className="w-[3px] bg-amber rounded-full animate-bar4 h-5" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Ringtoons
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/" className="hover:text-paper transition-colors">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}
