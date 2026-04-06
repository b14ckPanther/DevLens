"use client";
import { useState } from "react";
import { updateSettingsAction } from "@/app/actions/admin";
import { Save, Calendar, Users } from "lucide-react";

export default function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSettingsAction(settings);
    setLoading(false);
    if (!res.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-[rgba(234,234,234,0.5)] uppercase mb-3">
              <Calendar size={14} className="text-[#00C2FF]" /> Started Year
            </label>
            <input 
              type="number"
              value={settings.started_year}
              onChange={e => setSettings({ ...settings, started_year: parseInt(e.target.value) })}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-[#00C2FF] transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-[rgba(234,234,234,0.5)] uppercase mb-3">
              <Users size={14} className="text-[#FF2D95]" /> Happy Clients
            </label>
            <input 
              type="number"
              value={settings.base_clients_count}
              onChange={e => setSettings({ ...settings, base_clients_count: parseInt(e.target.value) })}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-[#FF2D95] transition-all"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#00C2FF] to-[#3A2BFF] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,194,255,0.2)] hover:shadow-[0_0_40px_rgba(0,194,255,0.4)] hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Changes Saved!' : <><Save size={18} /> Save Settings</>}
          </button>
        </div>
      </form>
    </div>
  );
}
