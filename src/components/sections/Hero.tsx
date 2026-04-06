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
      className="relative flex min-h-screen flex-col overflow-hidden px-4 pt-12 md:pt-24"
    >
      {/* Background — lighter blur on small screens; second layer desktop-only */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        style={{ contain: "strict" }}
      >
        <div className="grain-overlay hidden opacity-[0.15] md:block" />

        <div
          className="hero-aurora absolute -top-[20%] -left-[10%] h-[120%] w-[120%] opacity-[0.12] blur-[36px] mix-blend-screen motion-reduce:animate-none sm:blur-[48px] md:blur-[72px] lg:blur-[88px] animate-[aurora-drift_22s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, #1A3CFF 0%, transparent 50%), radial-gradient(circle at 80% 70%, #FF2D95 0%, transparent 50%)",
          }}
        />
        <div
          className="hero-aurora absolute -top-[20%] -left-[10%] hidden h-[120%] w-[120%] opacity-[0.08] blur-[48px] mix-blend-screen motion-reduce:animate-none md:block md:blur-[72px] lg:blur-[88px] animate-[aurora-drift_28s_ease-in-out_infinite_reverse]"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, #00C2FF 0%, transparent 40%), radial-gradient(circle at 30% 80%, #3A2BFF 0%, transparent 40%)",
          }}
        />

        <div
          className="absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,194,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col items-center justify-center px-0 pb-6 text-center"
        >
          <span className="glass mb-6 mt-10 inline-flex items-center gap-2 rounded-full border border-[rgba(255,195,48,0.35)] bg-[rgba(255,195,48,0.06)] px-4 py-2 text-xs font-medium md:mt-0 md:mb-8 md:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffc330] opacity-95 shadow-[0_0_10px_rgba(255,195,48,0.55)]" />
            <span className="gradient-text-highlight">{t("badge")}</span>
          </span>

          <h1 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#EAEAEA] md:text-5xl lg:text-5xl">
            {t("title")}
            <br />
            <span className="gradient-text-highlight mt-3 inline-block md:mt-5">{t("titleHighlight")}</span>
          </h1>

          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[rgba(234,234,234,0.65)] md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="btn-gradient-gold btn-gradient-gold-animated relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold shadow-[0_0_28px_rgba(255,195,48,0.45)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_44px_rgba(255,195,48,0.55)]"
            >
              {t("cta1")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 rtl:rotate-180"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#work")}
              className="rounded-2xl border border-[rgba(255,255,255,0.12)] px-8 py-4 text-base font-semibold text-[#EAEAEA] glass transition-all duration-300 hover:border-[rgba(0,194,255,0.4)] hover:text-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.15)]"
            >
              {t("cta2")}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { value: projCount, label: t("stat1") },
              { value: clientCount, label: t("stat2") },
              { value: yrsCount, label: t("stat3") },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-extrabold gradient-text-highlight">{stat.value}</span>
                <span className="text-sm text-[rgba(234,234,234,0.5)]">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* In document flow — no overlap with stats, no extra padding hacks */}
        <div className="pointer-events-none flex shrink-0 flex-col items-center gap-2 pb-6 pt-2">
          <span className="text-xs uppercase tracking-widest text-[rgba(234,234,234,0.3)]">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#00C2FF] to-transparent opacity-75" />
        </div>
      </div>
    </section>
  );
}
