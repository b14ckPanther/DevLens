"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Target, MousePointer2, Percent } from "lucide-react";

export default function AnalyticsClient({ summary }: { summary: any }) {
  const stats = [
    { label: "Total Leads", value: summary.totalLeads, icon: <Users size={20} />, color: "#00C2FF" },
    { label: "Total Projects", value: summary.totalProjects, icon: <Target size={20} />, color: "#FF2D95" },
    { label: "Conversion Rate", value: `${((summary.totalLeads / 100) * 100).toFixed(1)}%`, icon: <Percent size={20} />, color: "#FFC300" },
    { label: "Plan Clicks", value: summary.eventStats.length, icon: <MousePointer2 size={20} />, color: "#25D366" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass border border-[rgba(255,255,255,0.08)] p-6 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-[rgba(234,234,234,0.4)] uppercase tracking-wider">Live</span>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-[rgba(234,234,234,0.5)] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plan Popularity */}
        <div className="glass border border-[rgba(255,255,255,0.08)] p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-[#00C2FF]" />
            <h3 className="text-xl font-bold text-white">Plan Interest</h3>
          </div>
          
          <div className="space-y-6">
            {['Basic', 'Pro', 'Enterprise'].map((plan) => {
              const count = summary.eventStats.filter((e: any) => e.metadata?.plan === plan).length;
              const percentage = summary.eventStats.length ? (count / summary.eventStats.length) * 100 : 0;
              
              return (
                <div key={plan} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgba(234,234,234,0.7)] font-bold">{plan} Plan</span>
                    <span className="text-white">{count} clicks</span>
                  </div>
                  <div className="h-2 w-full bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#00C2FF] to-[#1A3CFF]" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass border border-[rgba(255,255,255,0.08)] p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-[#FF2D95]" />
            <h3 className="text-xl font-bold text-white">Real-time Feed</h3>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {summary.eventStats.slice().reverse().map((event: any, i: number) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(0,194,255,0.1)] flex items-center justify-center text-[#00C2FF] flex-shrink-0">
                  <MousePointer2 size={14} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Plan Viewed: {event.metadata?.plan}</div>
                  <div className="text-[10px] text-[rgba(234,234,234,0.4)] uppercase">
                    {new Date(event.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            {summary.eventStats.length === 0 && (
              <div className="text-center py-12 text-[rgba(234,234,234,0.3)] text-sm italic">
                Waiting for user activity...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
