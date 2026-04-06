"use client";
import { useState } from "react";
import { savePlanAction, deletePlanAction } from "@/app/actions/admin";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Edit2, Trash2, Check, Star, GripVertical, X, Globe } from "lucide-react";

export default function PlansClient({ initialPlans }: { initialPlans: any[] }) {
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ar' | 'he'>('en');

  const openAdd = () => {
    setEditingPlan({
      name_en: "",
      name_ar: "",
      name_he: "",
      price_one_time: 0,
      price_subscription: 0,
      price_subscription_yearly: 0,
      description_en: "",
      description_ar: "",
      description_he: "",
      features_en: [""],
      features_ar: [""],
      features_he: [""],
      is_popular: false,
      order_index: plans.length
    });
    setIsModalOpen(true);
  };

  const openEdit = (plan: any) => {
    setEditingPlan({ 
      ...plan,
      features_en: plan.features_en || [""],
      features_ar: plan.features_ar || [""],
      features_he: plan.features_he || [""]
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await savePlanAction(editingPlan);
    setLoading(false);
    if (!res.error) {
      setIsModalOpen(false);
      window.location.reload();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await deletePlanAction(id);
    if (!res.error) {
      setPlans(plans.filter(p => p.id !== id));
    } else {
      alert(res.error);
    }
  };

  const addFeature = (lang: 'en' | 'ar' | 'he') => {
    const key = `features_${lang}` as keyof typeof editingPlan;
    setEditingPlan({ ...editingPlan, [key]: [...(editingPlan[key] as string[]), ""] });
  };

  const updateFeature = (index: number, value: string, lang: 'en' | 'ar' | 'he') => {
    const key = `features_${lang}` as keyof typeof editingPlan;
    const newFeatures = [...(editingPlan[key] as string[])];
    newFeatures[index] = value;
    setEditingPlan({ ...editingPlan, [key]: newFeatures });
  };

  const removeFeature = (index: number, lang: 'en' | 'ar' | 'he') => {
    const key = `features_${lang}` as keyof typeof editingPlan;
    const newFeatures = (editingPlan[key] as string[]).filter((_: any, i: number) => i !== index);
    setEditingPlan({ ...editingPlan, [key]: newFeatures });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#00C2FF] text-[#0A0A0F] font-bold rounded-xl shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:scale-[1.02] transition-transform"
        >
          <Plus size={18} /> Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`glass border rounded-3xl p-6 relative flex flex-col ${plan.is_popular ? 'border-[#00C2FF] shadow-[0_0_30px_rgba(0,194,255,0.1)]' : 'border-[rgba(255,255,255,0.08)]'}`}>
            {plan.is_popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00C2FF] text-[#0A0A0F] text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <Star size={10} fill="currentColor" /> Most Popular
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name_en}</h3>
                <p className="text-[10px] text-[rgba(234,234,234,0.3)] uppercase">{plan.name_ar} • {plan.name_he}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">₪{plan.price_one_time || 0}</div>
                <div className="text-[10px] text-[rgba(234,234,234,0.4)] uppercase">One Time</div>
              </div>
            </div>

            <div className="flex-1 space-y-2 mb-6">
               <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest opacity-60">Features (EN)</div>
               <div className="space-y-1">
                  {(plan.features_en as string[])?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-[rgba(234,234,234,0.6)]">
                      <Check size={10} className="text-[#00C2FF]" /> {f}
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <button 
                onClick={() => openEdit(plan)}
                className="flex-1 flex items-center justify-center gap-2 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-xs hover:border-[#00C2FF] transition-colors"
              >
                <Edit2 size={14} /> Edit Plan
              </button>
              <button 
                onClick={() => handleDelete(plan.id)}
                className="p-2 glass border border-[rgba(255,45,149,0.2)] rounded-xl text-[#FF2D95] hover:bg-[rgba(255,45,149,0.1)] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && editingPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden glass-stronger border border-[rgba(255,255,255,0.12)] rounded-[40px] flex flex-col">
              <div className="p-8 border-b border-[rgba(255,255,255,0.08)] flex justify-between items-center bg-[rgba(255,255,255,0.02)]">
                <div>
                    <h2 className="text-2xl font-extrabold text-white">{editingPlan.id ? 'Edit Plan' : 'Add New Plan'}</h2>
                    <p className="text-xs text-[rgba(234,234,234,0.4)] uppercase mt-1">Trilingual Pricing Control Center</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-[rgba(234,234,234,0.5)] hover:text-white transition-colors bg-[rgba(255,255,255,0.05)] rounded-full"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-10">
                
                {/* 1. Price Control Center (Global) */}
                <div className="p-6 rounded-[32px] bg-gradient-to-br from-[rgba(0,194,255,0.05)] to-transparent border border-[rgba(0,194,255,0.1)]">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#00C2FF] mb-6 flex items-center gap-2">
                        <Star size={14} /> Pricing & Popularity (Global)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[rgba(234,234,234,0.4)] mb-2">Monthly (₪)</label>
                            <input type="number" step="0.01" value={editingPlan.price_subscription || 0} onChange={e => setEditingPlan({...editingPlan, price_subscription: parseFloat(e.target.value)})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-4 py-3 text-white font-bold outline-none focus:border-[#00C2FF]" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[rgba(234,234,234,0.4)] mb-2">Yearly (₪)</label>
                            <input type="number" step="0.01" value={editingPlan.price_subscription_yearly || 0} onChange={e => setEditingPlan({...editingPlan, price_subscription_yearly: parseFloat(e.target.value)})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-4 py-3 text-white font-bold outline-none focus:border-[#FF2D95]" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[rgba(234,234,234,0.4)] mb-2">Ownership (₪)</label>
                            <input type="number" step="0.01" value={editingPlan.price_one_time || 0} onChange={e => setEditingPlan({...editingPlan, price_one_time: parseFloat(e.target.value)})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-4 py-3 text-white font-bold outline-none focus:border-[#FFC300]" />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-3 cursor-pointer p-3 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.05)] hover:border-[#00C2FF] transition-all group w-full">
                                <input type="checkbox" checked={editingPlan.is_popular} onChange={e => setEditingPlan({...editingPlan, is_popular: e.target.checked})} className="hidden" />
                                <div className={`w-10 h-6 rounded-full transition-colors relative ${editingPlan.is_popular ? 'bg-[#00C2FF]' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${editingPlan.is_popular ? 'left-5' : 'left-1'}`} />
                                </div>
                                <span className="text-xs font-bold text-[rgba(234,234,234,0.6)] group-hover:text-white transition-colors">Most Popular</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* 2. Language Content Interface */}
                <div>
                    <div className="flex gap-2 mb-6 bg-[rgba(255,255,255,0.02)] p-1 rounded-2xl border border-[rgba(255,255,255,0.05)] w-fit">
                        {['en', 'ar', 'he'].map((t) => (
                            <button 
                                key={t}
                                type="button"
                                onClick={() => setActiveTab(t as any)}
                                className={`px-8 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === t ? 'bg-white text-black shadow-lg scale-105' : 'text-[rgba(234,234,234,0.4)] hover:text-white'}`}
                            >
                                {t === 'en' ? 'English' : t === 'ar' ? 'Arabic (العربية)' : 'Hebrew (עברית)'}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Headers & Desc */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase text-[rgba(234,234,234,0.3)] tracking-[0.2em] flex items-center gap-2">
                                    <Globe size={12} /> Textual Content ({activeTab.toUpperCase()})
                                </h3>
                                <div>
                                    <label className="block text-[10px] uppercase text-[rgba(234,234,234,0.4)] mb-1">Plan Name</label>
                                    <input 
                                        value={(editingPlan as any)[`name_${activeTab}`] || ""} 
                                        onChange={e => setEditingPlan({...editingPlan, [`name_${activeTab}`]: e.target.value})} 
                                        dir={activeTab === 'en' ? 'ltr' : 'rtl'}
                                        className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-white/20" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[rgba(234,234,234,0.4)] mb-1">Description</label>
                                    <textarea 
                                        rows={4} 
                                        value={(editingPlan as any)[`description_${activeTab}`] || ""} 
                                        onChange={e => setEditingPlan({...editingPlan, [`description_${activeTab}`]: e.target.value})} 
                                        dir={activeTab === 'en' ? 'ltr' : 'rtl'}
                                        className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-2xl px-4 py-3 text-sm text-white leading-relaxed resize-none outline-none focus:border-white/20" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase text-[rgba(234,234,234,0.3)] tracking-[0.2em] flex items-center gap-2">
                                <Check size={12} /> Features List ({activeTab.toUpperCase()})
                            </h3>
                            <div className="space-y-3">
                                {((editingPlan as any)[`features_${activeTab}`] as string[]).map((feature: string, idx: number) => (
                                    <div key={idx} className="flex gap-2 group">
                                        <div className="flex-1 relative">
                                            <input 
                                                placeholder={activeTab === 'en' ? `Feature ${idx+1}...` : activeTab === 'ar' ? `ميزة ${idx+1}...` : `תכונה ${idx+1}...`}
                                                value={feature || ""} 
                                                dir={activeTab === 'en' ? 'ltr' : 'rtl'}
                                                onChange={e => updateFeature(idx, e.target.value, activeTab)}
                                                className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-xs text-white outline-none focus:border-white/20 transition-all group-hover:bg-[rgba(255,255,255,0.04)]" 
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeFeature(idx, activeTab)} className="p-3 text-[rgba(255,45,149,0.3)] hover:text-[#FF2D95] transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addFeature(activeTab)} className="w-full py-4 border border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl text-[10px] font-bold text-[rgba(234,234,234,0.4)] flex items-center justify-center gap-2 hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all">
                                    <Plus size={14} /> Add Selling Point ({activeTab.toUpperCase()})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[rgba(255,255,255,0.08)] flex justify-end gap-4 pb-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-sm font-bold text-[rgba(234,234,234,0.5)] hover:text-white transition-colors">Cancel</button>
                  <button type="submit" disabled={loading} className="px-12 py-3.5 bg-white text-black font-extrabold rounded-2xl shadow-xl hover:scale-[1.03] transition-all disabled:opacity-50">
                    {loading ? 'Propagating Changes...' : 'Save Detailed Plan'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
