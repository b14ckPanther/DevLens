import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import CRMClient from "@/app/[locale]/admin/crm/CRMClient";

export default async function CRMPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Leads CRM</h1>
          <p className="text-[rgba(234,234,234,0.5)]">Track and manage your client inquiries</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-white transition-colors">
            &larr; Dashboard
          </Link>
        </div>
      </div>

      <CRMClient initialLeads={leads || []} />
    </div>
  );
}
