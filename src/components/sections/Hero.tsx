"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero({ stats }: { stats?: { projectsCount: number, clientsCount: number, yearsExperience: number } }) {
  const t = useTranslations("hero");

  const projCount = stats?.projectsCount ? `${stats.projectsCount}+` : t("stat1Value");
  const clientCount = stats?.clientsCount ? `${stats.clientsCount}+` : t("stat2Value");
  const yrsCount = stats?.yearsExperience ? `${stats.yearsExperience}+` : t("stat3Value");

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-12 md:pt-24 pb-16 md:py-0"
    >
      {/* Background Digital Aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ contain: 'paint' }}>
        <div className="grain-overlay opacity-[0.15]" />
        
        {/* Layered Aurora Streaks */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-[0.12] blur-[60px] md:blur-[100px] mix-blend-screen animate-[aurora-drift_20s_ease-in-out_infinite]"
          style={{ 
            background: 'radial-gradient(circle at 20% 30%, #1A3CFF 0%, transparent 50%), radial-gradient(circle at 80% 70%, #FF2D95 0%, transparent 50%)',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-[0.08] blur-[60px] md:blur-[100px] mix-blend-screen animate-[aurora-drift_25s_ease-in-out_infinite_reverse]"
          style={{ 
            background: 'radial-gradient(circle at 70% 20%, #00C2FF 0%, transparent 40%), radial-gradient(circle at 30% 80%, #3A2BFF 0%, transparent 40%)',
            willChange: 'transform'
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,194,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 rounded-full text-xs md:text-sm font-medium glass border border-[rgba(0,194,255,0.25)] text-[#00C2FF] mt-10 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight mb-6 text-[#EAEAEA]"
        >
          {t("title")}
          <br />
          <span className="gradient-text-blue">{t("titleHighlight")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="md:text-xl text-[rgba(234,234,234,0.65)] max-w-2xl leading-relaxed mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-16"
        >
          <button
            onClick={() => scrollToSection("#contact")}
            className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl bg-gradient-to-r from-[#00C2FF] via-[#1A3CFF] to-[#3A2BFF] text-white shadow-[0_0_30px_rgba(0,194,255,0.4)] hover:shadow-[0_0_50px_rgba(0,194,255,0.6)] hover:scale-[1.04] transition-all duration-300 animate-gradient"
            style={{ backgroundSize: "200% 200%" }}
          >
            {t("cta1")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180 flex-shrink-0"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => scrollToSection("#work")}
            className="px-8 py-4 text-base font-semibold rounded-2xl glass border border-[rgba(255,255,255,0.12)] text-[#EAEAEA] hover:border-[rgba(0,194,255,0.4)] hover:text-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.15)] transition-all duration-300"
          >
            {t("cta2")}
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { value: projCount, label: t("stat1") },
            { value: clientCount, label: t("stat2") },
            { value: yrsCount, label: t("stat3") },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold gradient-text-blue">{stat.value}</span>
              <span className="text-sm text-[rgba(234,234,234,0.5)]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[rgba(234,234,234,0.3)] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00C2FF] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
