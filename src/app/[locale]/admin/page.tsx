import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Dashboard</h1>
          <p className="text-[rgba(234,234,234,0.5)]">Manage your DevLens business</p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-[#00C2FF] transition-colors">
            View Live Site
          </Link>
          <Link href="/admin/plans" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-[#FFC300] transition-colors flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[#FFC300]" /> Plans
          </Link>
          <Link href="/admin/analytics" className="px-4 py-2 glass border border-[rgba(0,194,255,0.2)] rounded-xl text-sm hover:border-[#00C2FF] transition-colors flex items-center gap-2 text-[#00C2FF] font-bold">
             <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" /> Analytics
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-white transition-colors flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[#EAEAEA]" /> Settings
          </Link>
          <form action="/api/admin/logout" method="POST">
             <button type="submit" className="px-4 py-2 bg-[rgba(255,45,149,0.1)] text-[#FF2D95] border border-[rgba(255,45,149,0.3)] rounded-xl text-sm hover:bg-[#FF2D95] hover:text-white transition-colors">
              Logout
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/crm" className="glass border border-[rgba(255,255,255,0.08)] p-6 rounded-3xl hover:border-[#00C2FF] transition-all">
          <h3 className="text-sm text-[rgba(234,234,234,0.5)] mb-2">Total Leads</h3>
          <p className="text-3xl font-bold gradient-text-blue">{leads?.length || 0}</p>
        </Link>
        <Link href="/admin/projects" className="glass border border-[rgba(255,255,255,0.08)] p-6 rounded-3xl hover:border-[#FF2D95] transition-all">
          <h3 className="text-sm text-[rgba(234,234,234,0.5)] mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-[#FF2D95]">{projects?.length || 0}</p>
        </Link>
        <Link href="/admin/analytics" className="glass border border-[rgba(255,195,0,0.2)] p-6 rounded-3xl hover:border-[#FFC300] transition-all group">
          <h3 className="text-sm text-[rgba(234,234,234,0.5)] mb-2">Conversion Stats</h3>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-[#FFC300]">View Live Feed</p>
            <div className="w-3 h-3 rounded-full bg-[#FFC300] group-hover:animate-ping" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leads CRM Preview */}
        <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Contact Requests</h2>
            <Link href="/admin/crm" className="text-sm text-[#00C2FF] hover:underline">View CRM &rarr;</Link>
          </div>
          <div className="space-y-4">
            {leads?.length === 0 ? (
              <p className="text-sm text-[rgba(234,234,234,0.4)]">No new requests.</p>
            ) : (
              leads?.slice(0, 5).map(lead => (
                <div key={lead.id} className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{lead.client_name}</h4>
                    <p className="text-xs text-[rgba(234,234,234,0.5)]">{lead.service_requested}</p>
                  </div>
                  <span className="px-2 py-1 bg-[rgba(255,195,0,0.1)] text-[#FFC300] text-[10px] font-bold rounded-full uppercase">
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Projects Preview */}
        <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Live Projects</h2>
            <Link href="/admin/projects" className="text-sm text-[#FF2D95]">Manage Projects &rarr;</Link>
          </div>
          <div className="space-y-4">
            {projects?.length === 0 ? (
              <p className="text-sm text-[rgba(234,234,234,0.4)]">No projects found.</p>
            ) : (
              projects?.slice(0, 5).map(project => (
                <div key={project.id} className="p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                    {project.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{project.name_en}</h4>
                    <p className="text-xs text-[rgba(234,234,234,0.5)] capitalize">{project.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
