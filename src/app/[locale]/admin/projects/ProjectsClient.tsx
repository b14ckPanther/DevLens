"use client";
import { useState } from "react";
import { deleteProjectAction, saveProjectAction, uploadProjectFileAction, toggleProjectPublishAction } from "@/app/actions/admin";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const confirmDelete = async (id: number) => {
    setLoadingId(id);
    const res = await deleteProjectAction(id);
    setLoadingId(null);
    if (res.error) {
      alert(res.error);
    } else {
      setProjects(projects.filter(p => p.id !== id));
      setDeletingId(null);
    }
  };

  const openNew = () => {
    setEditingProject({
      category: "sales", initials: "NW", color: "#00C2FF", is_published: false,
      name_en: "", name_ar: "", name_he: "",
      description_en: "", description_ar: "", description_he: "",
      logo_url: "", cover_url: ""
    });
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingProject({ ...p });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url' | 'cover_url') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (field === 'logo_url') setUploadingLogo(true);
    else setUploadingCover(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", `${Date.now()}_${file.name.replace(/\s+/g, "_")}`);

    const res = await uploadProjectFileAction(formData);
    
    if (res.error) alert(res.error);
    else setEditingProject({ ...editingProject, [field]: res.url });

    if (field === 'logo_url') setUploadingLogo(false);
    else setUploadingCover(false);
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await saveProjectAction(editingProject);
    setSaving(false);
    if (res.error) {
      alert(res.error);
    } else {
      setIsModalOpen(false);
      window.location.reload();
    }
  };

  const handleTogglePublish = async (project: any) => {
    // Optimistic Update
    const updatedProjects = projects.map(p => 
      p.id === project.id ? { ...p, is_published: !p.is_published } : p
    );
    setProjects(updatedProjects);

    const res = await toggleProjectPublishAction(project.id, project.is_published);
    if (res.error) {
      alert(res.error);
      // Revert on error
      setProjects(projects);
    }
  };

  const filteredProjects = projects.filter(p => {
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    if (searchQuery && !(p.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) || p.name_ar?.includes(searchQuery))) return false;
    return true;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex w-full md:w-auto gap-4">
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00C2FF]"
          />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2 text-sm text-[rgba(234,234,234,0.7)] focus:outline-none focus:border-[#00C2FF] cursor-pointer"
            style={{ colorScheme: 'dark' }}
          >
            <option value="all">All Categories</option>
            <option value="sales">Sales</option>
            <option value="menus">Menus</option>
            <option value="landing">Landing</option>
            <option value="booking">Booking</option>
            <option value="market">Market</option>
          </select>
        </div>
        <button onClick={openNew} className="shrink-0 px-4 py-2 bg-[#FF2D95] text-white font-bold rounded-xl text-sm hover:bg-[#FF4FD8] transition-colors shadow-[0_0_15px_rgba(255,45,149,0.3)]">
          + New Project
        </button>
      </div>
      <div className="glass border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden mt-6">
        <table className="w-full text-left border-collapse relative">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
              <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Project</th>
              <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Category</th>
              <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-[rgba(234,234,234,0.5)] uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr 
                key={project.id} 
                className={`border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.01)] transition-all duration-300 relative ${!project.is_published ? 'opacity-60 grayscale-[0.3]' : ''}`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {project.logo_url ? (
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] relative flex-shrink-0 bg-[rgba(255,255,255,0.02)]">
                        <Image
                          src={project.logo_url}
                          alt="Logo"
                          fill
                          sizes="32px"
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                        {project.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-sm text-white">{project.name_en}</div>
                      <div className="text-xs text-[rgba(234,234,234,0.5)] truncate max-w-[200px]">{project.description_en}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-[rgba(234,234,234,0.7)] capitalize">{project.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleTogglePublish(project)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        project.is_published ? 'bg-[#00C2FF]' : 'bg-[rgba(255,255,255,0.1)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          project.is_published ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${project.is_published ? 'text-[#00C2FF]' : 'text-[rgba(234,234,234,0.3)]'}`}>
                      {project.is_published ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(project)} className="text-xs text-[#00C2FF] hover:text-white mr-3 transition-colors">Edit</button>
                  <button onClick={() => setDeletingId(project.id)} className="text-xs text-[#FF2D95] hover:text-white transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[rgba(234,234,234,0.4)] text-sm">
                  No projects found. Create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Beautiful Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#0A0A0F]/80 backdrop-blur-sm"
              onClick={() => setDeletingId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 glass border border-[rgba(255,255,255,0.08)] p-8 rounded-3xl max-w-sm w-full shadow-[0_0_50px_rgba(255,45,149,0.15)]"
            >
              <div className="w-12 h-12 rounded-full bg-[rgba(255,45,149,0.1)] flex items-center justify-center mb-6 mx-auto border border-[rgba(255,45,149,0.3)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF2D95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-center text-white mb-2">Delete Project?</h2>
              <p className="text-sm text-[rgba(234,234,234,0.6)] text-center mb-8">
                This action cannot be undone. This project will be fully removed from your database and live website.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeletingId(null)}
                  className="flex-1 py-3 px-4 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm font-bold text-[#EAEAEA] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => confirmDelete(deletingId)}
                  disabled={loadingId === deletingId}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF2D95] to-[#FF4FD8] rounded-xl text-sm font-bold text-white shadow-[0_0_20px_rgba(255,45,149,0.4)] hover:shadow-[0_0_30px_rgba(255,45,149,0.6)] transition-all flex items-center justify-center"
                >
                  {loadingId === deletingId ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0A0F]/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 glass border border-[rgba(255,255,255,0.08)] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex justify-between items-center sticky top-0 glass z-20">
                <h2 className="text-xl font-bold text-white">{editingProject.id ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[rgba(234,234,234,0.5)] hover:text-white">&times;</button>
              </div>

              <form onSubmit={saveProject} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#00C2FF]">Visuals & Settings</h3>
                    <div>
                      <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Category</label>
                      <select 
                        value={editingProject.category} 
                        onChange={e => setEditingProject({...editingProject, category: e.target.value})} 
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="sales">Sales</option>
                        <option value="menus">Menus</option>
                        <option value="landing">Landing</option>
                        <option value="booking">Booking</option>
                        <option value="market">Market</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Live Site URL (Optional)</label>
                      <input 
                        type="url"
                        placeholder="https://example.com"
                        value={editingProject.live_url || ''} 
                        onChange={e => setEditingProject({...editingProject, live_url: e.target.value})} 
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white text-sm focus:border-[#00C2FF] outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Initials (2 letters)</label>
                        <input maxLength={2} value={editingProject.initials} onChange={e => setEditingProject({...editingProject, initials: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Brand Color (Hex)</label>
                        <div className="flex gap-2">
                          <input type="color" value={editingProject.color} onChange={e => setEditingProject({...editingProject, color: e.target.value})} className="h-10 w-10 p-0 border-0 rounded overflow-hidden flex-shrink-0" />
                          <input value={editingProject.color} onChange={e => setEditingProject({...editingProject, color: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 text-white text-sm" />
                        </div>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer mt-4">
                      <input type="checkbox" checked={editingProject.is_published} onChange={e => setEditingProject({...editingProject, is_published: e.target.checked})} className="rounded text-[#FF2D95]" />
                      <span className="text-sm">Publish project live</span>
                    </label>
                  </div>

                  {/* English Data & Images */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-white">English Data & Media</h3>
                    <div>
                      <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Name</label>
                      <input required value={editingProject.name_en || ''} onChange={e => setEditingProject({...editingProject, name_en: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white" />
                    </div>
                      <div>
                        <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Description</label>
                        <textarea required value={editingProject.description_en || ''} onChange={e => setEditingProject({...editingProject, description_en: e.target.value})} className="w-full h-[68px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white resize-none" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Case Study (Detailed English)</label>
                        <textarea value={editingProject.case_study_en || ''} onChange={e => setEditingProject({...editingProject, case_study_en: e.target.value})} className="w-full h-[120px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white resize-none text-sm" placeholder="Detailed story, challenges, and solutions..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Logo Upload</label>
                          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'logo_url')} className="w-full text-xs text-[rgba(234,234,234,0.5)] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[rgba(0,194,255,0.1)] file:text-[#00C2FF] cursor-pointer" />
                          {uploadingLogo && <span className="text-[10px] text-[#FF2D95]">Uploading...</span>}
                          {editingProject.logo_url && <a href={editingProject.logo_url} target="_blank" className="text-[10px] text-[#00C2FF] block mt-1">View Logo</a>}
                        </div>
                        <div>
                          <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Cover Upload</label>
                          <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'cover_url')} className="w-full text-xs text-[rgba(234,234,234,0.5)] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[rgba(255,45,149,0.1)] file:text-[#FF2D95] cursor-pointer" />
                          {uploadingCover && <span className="text-[10px] text-[#FF2D95]">Uploading...</span>}
                          {editingProject.cover_url && <a href={editingProject.cover_url} target="_blank" className="text-[10px] text-[#00C2FF] block mt-1">View Cover</a>}
                        </div>
                      </div>
                    </div>
  
                    {/* Translations Data */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-white">Translations</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Name (AR)</label>
                            <input dir="rtl" value={editingProject.name_ar || ''} onChange={e => setEditingProject({...editingProject, name_ar: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-2 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Name (HE)</label>
                            <input dir="rtl" value={editingProject.name_he || ''} onChange={e => setEditingProject({...editingProject, name_he: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-2 text-white" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Description (AR)</label>
                            <textarea dir="rtl" value={editingProject.description_ar || ''} onChange={e => setEditingProject({...editingProject, description_ar: e.target.value})} className="w-full h-[60px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-1 text-white resize-none text-xs" />
                          </div>
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Description (HE)</label>
                            <textarea dir="rtl" value={editingProject.description_he || ''} onChange={e => setEditingProject({...editingProject, description_he: e.target.value})} className="w-full h-[60px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-1 text-white resize-none text-xs" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Case Study (AR)</label>
                            <textarea dir="rtl" value={editingProject.case_study_ar || ''} onChange={e => setEditingProject({...editingProject, case_study_ar: e.target.value})} className="w-full h-[100px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-1 text-white resize-none text-xs" />
                          </div>
                          <div>
                            <label className="block text-xs mb-1 text-[rgba(234,234,234,0.6)]">Case Study (HE)</label>
                            <textarea dir="rtl" value={editingProject.case_study_he || ''} onChange={e => setEditingProject({...editingProject, case_study_he: e.target.value})} className="w-full h-[100px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-1 text-white resize-none text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-end gap-3 sticky bottom-0 glass z-20">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 glass border border-[rgba(255,255,255,0.1)] rounded-xl font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-6 py-3 bg-[#00C2FF] text-[#0A0A0F] font-bold rounded-xl shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)]">
                    {saving ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
