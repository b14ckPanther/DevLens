import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import PlansClient from "@/app/[locale]/admin/plans/PlansClient";

export default async function PlansPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const { data: plans } = await supabase.from('plans').select('*').order('order_index', { ascending: true });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Pricing Plans</h1>
          <p className="text-[rgba(234,234,234,0.5)]">Manage service tiers and features</p>
        </div>
        <Link href="/admin" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-white transition-colors">
          &larr; Dashboard
        </Link>
      </div>

      <PlansClient initialPlans={plans || []} />
    </div>
  );
}
