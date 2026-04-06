import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import SettingsClient from "@/app/[locale]/admin/settings/SettingsClient";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const { data: settings } = await supabase.from('settings').select('*').eq('id', 1).single();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Business Settings</h1>
          <p className="text-[rgba(234,234,234,0.5)]">Manage global statistics and configuration</p>
        </div>
        <Link href="/admin" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-white transition-colors">
          &larr; Dashboard
        </Link>
      </div>

      <SettingsClient initialSettings={settings || { id: 1, started_year: 2023, base_clients_count: 40 }} />
    </div>
  );
}
