"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/components/sections/Work";
import { useLocale } from "next-intl";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  visitLabel: string;
  closeLabel: string;
}

const categoryColors: Record<string, string> = {
  sales: "#00C2FF",
  menus: "#FF6A00",
  landing: "#FF2D95",
  booking: "#FFC300",
  market: "#3A2BFF",
};

const categoryLabels: Record<string, string> = {
  sales: "Sales Website",
  menus: "Digital Menu",
  landing: "Landing Page",
  booking: "Booking System",
  market: "Marketplace",
};

export default function ProjectModal({ project, onClose, visitLabel, closeLabel }: ProjectModalProps) {
  const locale = useLocale();
  
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto glass-stronger border border-[rgba(255,255,255,0.12)] rounded-3xl p-8 max-w-sm w-full shadow-2xl"
              style={{
                boxShadow: `0 0 60px ${project.color}25, 0 0 0 1px ${project.color}20`,
              }}
            >
              {/* Icon / Logo Badge */}
              <div className="relative mb-8 pt-4">
                {/* Brand Ambient Glow */}
                <div 
                  className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 w-48 h-48 opacity-40 blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${project.color}aa 0%, transparent 70%)` }}
                />

                <div className="relative">
                  {/* Interactive/Glow Ring */}
                  <div 
                    className="absolute -inset-1 rounded-[2.5rem] opacity-30 blur-sm"
                    style={{ backgroundColor: project.color }}
                  />

                  {project.logo_url ? (
                    <div className="w-40 h-40 rounded-[2rem] relative flex items-center justify-center mx-auto overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)]">
                      <Image
                        src={project.logo_url}
                        alt="Logo"
                        fill
                        sizes="160px"
                        className="object-contain p-8"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-40 h-40 rounded-[2rem] flex items-center justify-center text-5xl font-black mx-auto overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                      style={{
                        background: 'white',
                        color: project.color,
                        boxShadow: `0 0 50px ${project.color}20`,
                      }}
                    >
                      {project.initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Category badge */}
              <div className="flex justify-center mb-3">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: `${categoryColors[project.category]}15`,
                    color: categoryColors[project.category],
                    border: `1px solid ${categoryColors[project.category]}30`,
                  }}
                >
                  {categoryLabels[project.category]}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-center text-[#EAEAEA] mb-1">
                {(locale === "ar" ? project.name_ar : (locale === "he" ? project.name_he : project.name_en)) || project.name_en}
              </h3>
              <p className="text-sm text-center text-[rgba(234,234,234,0.5)] mb-2">{project.category}</p>

              {/* Description / Case Study Story */}
              <div className="mt-4 mb-8 space-y-4">
                <p className="text-sm text-center text-[rgba(234,234,234,0.7)] leading-relaxed italic" dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}>
                  {(locale === "ar" ? project.description_ar : (locale === "he" ? project.description_he : project.description_en)) || project.description_en}
                </p>
                
                {(project.case_study_en || project.case_study_ar || project.case_study_he) && (
                  <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
                    <p className="text-xs text-[rgba(234,234,234,0.4)] uppercase font-bold tracking-widest mb-3 text-center">Project Story</p>
                    <p className="text-sm text-[rgba(234,234,234,0.8)] leading-relaxed text-justify" dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}>
                      {(locale === "ar" ? project.case_study_ar : (locale === "he" ? project.case_study_he : project.case_study_en)) || project.case_study_en}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-sm font-semibold text-[rgba(234,234,234,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all"
                >
                  {closeLabel}
                </button>
                <a
                  href={project.live_url || "#"}
                  target={project.live_url ? "_blank" : undefined}
                  rel={project.live_url ? "noopener noreferrer" : undefined}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] flex items-center justify-center ${!project.live_url && 'opacity-30 cursor-not-allowed grayscale'}`}
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
                    boxShadow: project.live_url ? `0 0 20px ${project.color}40` : 'none',
                  }}
                  onClick={(e) => {
                    if (!project.live_url) e.preventDefault();
                  }}
                >
                  {visitLabel} <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="inline-block ms-1"><path d="M2 11L11 2M11 2H5M11 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
