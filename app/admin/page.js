import { isAuthed } from "@/lib/auth";
import { getRingtones } from "@/lib/data";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = isAuthed();
  const ringtones = authed ? await getRingtones() : [];

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Admin</h1>
      {authed ? <AdminDashboard initialRingtones={ringtones} /> : <AdminLogin />}
    </div>
  );
}
