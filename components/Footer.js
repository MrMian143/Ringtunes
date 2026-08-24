export default function Footer() {
  return (
    <footer className="border-t border-line/60 mt-16">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} Ringtoons. Sab ringtones sirf personal use ke liye.</p>
        <a href="/admin" className="hover:text-paper transition-colors">
          Admin
        </a>
      </div>
    </footer>
  );
}
