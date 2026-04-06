import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#EAEAEA] font-cairo">
      {children}
    </div>
  );
}
