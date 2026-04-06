import { getAnalyticsSummaryAction } from "@/app/actions/admin";
import AnalyticsClient from "./AnalyticsClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummaryAction();
  
  if (summary.error) {
    return (
      <div className="p-8 text-center text-[#FF2D95] font-bold">
        Error loading analytics: {summary.error}
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 max-w-7xl mx-auto">
      <Link 
        href="/admin" 
        className="inline-flex items-center gap-2 text-sm text-[rgba(234,234,234,0.5)] hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>
      <div className="flex flex-col mb-10">
        <h2 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Platform Analytics</h2>
        <p className="text-[rgba(234,234,234,0.5)] text-sm max-w-lg leading-relaxed">
          Monitor your platform's conversion performance, user interest, and business growth in real-time. ₪📈🚀
        </p>
      </div>

      <AnalyticsClient summary={summary} />
    </div>
  );
}
