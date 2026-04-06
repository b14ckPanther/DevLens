import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import ProjectsClient from "./ProjectsClient";

export default async function AdminProjects() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const supabase = createAdminClient();
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Projects Manager</h1>
          <p className="text-[rgba(234,234,234,0.5)]">Add, edit, or remove portfolio items</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm hover:border-white transition-colors">
            &larr; Dashboard
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="px-4 py-2 bg-[rgba(255,45,149,0.1)] text-[#FF2D95] border border-[rgba(255,45,149,0.3)] rounded-xl text-sm hover:bg-[#FF2D95] hover:text-white transition-colors">
              Logout
            </button>
          </form>
        </div>
      </div>

      <ProjectsClient initialProjects={projects || []} />
    </div>
  );
}
