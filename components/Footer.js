export default function Footer() {
  return (
    <footer className="border-t border-line/60 mt-16">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
          <a href="/about" className="hover:text-paper transition-colors">About</a>
          <a href="/contact" className="hover:text-paper transition-colors">Contact</a>
          <a href="/terms" className="hover:text-paper transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-paper transition-colors">Privacy</a>
          <a href="/dmca" className="hover:text-paper transition-colors">Copyright / DMCA</a>
          <a href="/admin" className="hover:text-paper transition-colors">Admin</a>
        </nav>
        <p className="text-xs text-muted text-center">
          &copy; {new Date().getFullYear()} Ringtoons. Sab ringtones sirf personal use ke liye.
        </p>
      </div>
    </footer>
  );
}
