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

const EMPTY_PROJECTS: Project[] = [];

/** Keys under the `work` message namespace used for filter button labels */
type WorkFilterMessageKey =
  | "filterAll"
  | "filterSales"
  | "filterMenus"
  | "filterLanding"
  | "filterBooking"
  | "filterMarket";

export default function Work({
  initialProjects,
  projectsCount = 0,
}: {
  initialProjects?: Project[];
  projectsCount?: number;
}) {
  const projects = initialProjects ?? EMPTY_PROJECTS;
  const t = useTranslations("work");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters: { key: FilterKey; labelKey: WorkFilterMessageKey }[] = [
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
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects]
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
          subtitle={t("subtitle", { count: Number(projectsCount || projects.length || 0) })}
        />

        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {filters.map(({ key, labelKey }) => (
              <button
                type="button"
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  activeFilter === key
                    ? "btn-gradient-gold border-transparent shadow-[0_0_18px_rgba(255,195,48,0.45)]"
                    : "glass border-[rgba(255,255,255,0.1)] text-[rgba(234,234,234,0.7)] hover:border-[rgba(255,195,48,0.35)] hover:text-[#EAEAEA]"
                }`}
              >
                {t(labelKey)}
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
              className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-7 gap-5 sm:gap-3"
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
                  className="group flex cursor-pointer flex-col items-center gap-2 p-2"
                >
                  <div className="relative">
                    <div
                      className="absolute -inset-1 rounded-[1.5rem] opacity-0 blur-sm transition-all duration-300 group-hover:opacity-40"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[1.25rem] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-[1.04] sm:h-24 sm:w-24 sm:rounded-[1.5rem]">
                      {project.logo_url ? (
                        <Image
                          src={project.logo_url}
                          alt={project.name_en}
                          fill
                          sizes="(max-width: 639px) 80px, 96px"
                          className="object-contain p-4 sm:p-5"
                          priority={i < 5}
                          fetchPriority={i < 5 ? "high" : "auto"}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-black" style={{ color: project.color }}>
                          {project.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="max-w-[8.5rem] text-center text-[11px] font-bold leading-tight tracking-tight text-[#EAEAEA] transition-colors duration-300 group-hover:text-[#ffc330] sm:max-w-[10rem] sm:text-xs">
                    {(locale === "ar" ? project.name_ar : locale === "he" ? project.name_he : project.name_en) || project.name_en}
                  </p>
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
