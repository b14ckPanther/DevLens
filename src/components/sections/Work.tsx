"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectModal from "@/components/ProjectModal";

export type ProjectCategory = "sales" | "menus" | "landing" | "booking" | "market";

export interface Project {
  id: string;
  name_en: string;
  name_ar: string;
  name_he?: string;
  category: ProjectCategory;
  initials: string;
  color: string;
  description_en?: string;
  description_ar?: string;
  description_he?: string;
  logo_url?: string;
  cover_url?: string;
  live_url?: string;
  case_study_en?: string;
  case_study_ar?: string;
  case_study_he?: string;
}


type FilterKey = "all" | ProjectCategory;

export default function Work({
  initialProjects = [],
  projectsCount = 0
}: {
  initialProjects: any[],
  projectsCount?: number
}) {
  const t = useTranslations("work");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { key: FilterKey; labelKey: string }[] = [
    { key: "all", labelKey: "filterAll" },
    { key: "sales", labelKey: "filterSales" },
    { key: "menus", labelKey: "filterMenus" },
    { key: "landing", labelKey: "filterLanding" },
    { key: "booking", labelKey: "filterBooking" },
    { key: "market", labelKey: "filterMarket" },
  ];

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? initialProjects
        : initialProjects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="work" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(58,43,255,0.25)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
          subtitle={t("subtitle", { count: Number(projectsCount || initialProjects.length || 0) })}
        />

        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {filters.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border shrink-0 whitespace-nowrap ${
                  activeFilter === key
                    ? "bg-gradient-to-r from-[#00C2FF] to-[#1A3CFF] text-white border-transparent shadow-[0_0_16px_rgba(0,194,255,0.4)]"
                    : "glass border-[rgba(255,255,255,0.1)] text-[rgba(234,234,234,0.7)] hover:border-[rgba(0,194,255,0.3)] hover:text-white"
                }`}
              >
                {t(labelKey as any)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid Container */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout="position"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (i % 14) * 0.04,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-3xl glass border border-[rgba(255,255,255,0.05)] cursor-pointer overflow-hidden aspect-square flex flex-col items-center justify-center p-3 transition-all duration-500"
                >
                  {/* Brand Ambient Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl z-0"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}30 0%, transparent 70%)` }}
                  />

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                    {/* Logo Badge */}
                    <div className="relative">
                      {/* Interactive Ring */}
                      <div 
                        className="absolute -inset-1 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-95 group-hover:scale-105"
                        style={{ backgroundColor: project.color }}
                      />
                      
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.25rem] sm:rounded-[1.5rem] relative overflow-hidden flex-shrink-0 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-[1.02]">
                        {project.logo_url ? (
                          <Image
                            src={project.logo_url}
                            alt={project.name_en}
                            fill
                            sizes="(max-width: 639px) 80px, 96px"
                            className="object-contain p-4 sm:p-5"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl font-black" style={{ color: project.color }}>
                            {project.initials}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center px-1">
                      <p className="text-[11px] sm:text-[12px] text-white font-bold tracking-tight mb-0.5 opacity-80 group-hover:opacity-100 transition-all duration-300">
                        {(locale === "ar" ? project.name_ar : (locale === "he" ? project.name_he : project.name_en)) || project.name_en}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-[rgba(234,234,234,0.4)] font-black">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Clean Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 top-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 z-20">
                    <span 
                      className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {t("viewProject")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        visitLabel={t("visitSite")}
        closeLabel={t("close")}
      />
    </section>
  );
}
