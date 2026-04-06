"use client";
import { useState } from "react";
import { updateLeadStatusAction, deleteLeadAction, convertLeadToProjectAction } from "@/app/actions/admin";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Mail, Calendar, Briefcase, MessageSquare, Trash2, CheckCircle, Clock, ExternalLink } from "lucide-react";

export default function CRMClient({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const updateStatus = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const res = await updateLeadStatusAction(id, newStatus);
    setLoadingId(null);
    if (!res.error) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
    } else {
      alert(res.error);
    }
  };

  const handleConvertToProject = async (leadId: string) => {
    if (!confirm("This will create a new project draft from this lead. Continue?")) return;
    setConvertingId(leadId);
    const res = await convertLeadToProjectAction(leadId);
    setConvertingId(null);
    if (res.error) {
      alert(res.error);
    } else {
      alert("Successfully converted to project draft!");
      window.location.href = `/${initialLeads[0]?.locale || 'en'}/admin/projects`;
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    setLoadingId(id);
    const res = await deleteLeadAction(id);
    setLoadingId(null);
    if (!res.error) {
      setLeads(leads.filter(l => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } else {
      alert(res.error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-[rgba(0,194,255,0.1)] text-[#00C2FF]';
      case 'completed': return 'bg-[rgba(37,211,102,0.1)] text-[#25D366]';
      case 'declined': return 'bg-[rgba(255,45,149,0.1)] text-[#FF2D95]';
      default: return 'bg-[rgba(255,195,0,0.1)] text-[#FFC300]';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Table Section */}
      <div className="lg:col-span-2">
        <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
                <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Client</th>
                <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Service</th>
                <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className={`border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.01)] transition-colors cursor-pointer ${selectedLead?.id === lead.id ? 'bg-[rgba(0,194,255,0.03)] border-s-2 border-s-[#00C2FF]' : ''}`}
                >
                  <td className="p-4">
                    <div className="font-bold text-sm text-white">{lead.client_name}</div>
                    <div className="text-xs text-[rgba(234,234,234,0.5)]">{new Date(lead.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4 text-sm text-[rgba(234,234,234,0.7)]">{lead.service_requested}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                      className="p-2 text-[rgba(234,234,234,0.3)] hover:text-[#FF2D95] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[rgba(234,234,234,0.4)] text-sm">
                    No leads found. Check back later!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Section */}
      <div className="lg:col-span-1">
        <AnimatePresence mode="wait">
          {selectedLead ? (
            <motion.div
              key={selectedLead.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl p-6 sticky top-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Lead Details</h3>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#00C2FF]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[rgba(234,234,234,0.4)]">Email</label>
                    <a h-ref={`mailto:${selectedLead.email}`} className="text-sm text-white hover:text-[#00C2FF]">{selectedLead.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#25D366]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[rgba(234,234,234,0.4)]">Phone</label>
                    <a h-ref={`tel:${selectedLead.phone}`} className="text-sm text-white hover:text-[#00C2FF]">{selectedLead.phone || 'N/A'}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#FFC300]">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[rgba(234,234,234,0.4)]">Business Type</label>
                    <span className="text-sm text-white">{selectedLead.business_type || 'Custom'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                  <label className="flex items-center gap-2 text-[10px] uppercase text-[rgba(234,234,234,0.4)] mb-2">
                    <MessageSquare size={12} /> Notes
                  </label>
                  <p className="text-sm text-[rgba(234,234,234,0.7)] whitespace-pre-wrap italic">
                    "{selectedLead.notes || 'No notes provided.'}"
                  </p>
                </div>

                <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => updateStatus(selectedLead.id, 'approved')}
                      disabled={selectedLead.status === 'approved' || loadingId === selectedLead.id}
                      className="flex-1 py-3 px-4 bg-[#00C2FF] text-[#0A0A0F] rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(0,194,255,0.2)] hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] transition-all disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedLead.id, 'declined')}
                      disabled={selectedLead.status === 'declined' || loadingId === selectedLead.id}
                      className="flex-1 py-3 px-4 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-xs font-bold text-[#FF2D95] hover:bg-[rgba(255,45,149,0.05)] transition-all disabled:opacity-50"
                    >
                      Decline
                    </button>
                  </div>

                  {selectedLead.status === 'approved' && (
                    <button 
                      onClick={() => handleConvertToProject(selectedLead.id)}
                      disabled={convertingId === selectedLead.id}
                      className="w-full py-4 px-4 bg-gradient-to-r from-[#FFC300] to-[#FF6A00] text-[#0A0A0F] rounded-xl text-sm font-extrabold shadow-[0_0_20px_rgba(255,195,0,0.3)] hover:shadow-[0_0_30px_rgba(255,195,0,0.5)] transition-all flex items-center justify-center gap-2 group"
                    >
                      {convertingId === selectedLead.id ? (
                         <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          Convert to Project Draft
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[rgba(234,234,234,0.2)] mb-4">
                <Calendar size={32} />
              </div>
              <h4 className="text-white font-bold mb-2">Select a Lead</h4>
              <p className="text-xs text-[rgba(234,234,234,0.5)]">Select any lead from the list to view their full details and take action.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
