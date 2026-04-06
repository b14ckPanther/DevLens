"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

const icons = [
  // Custom
  <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3L25 8.5V19.5L14 25L3 19.5V8.5L14 3Z" stroke="#00C2FF" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 3V25M3 8.5L25 19.5M25 8.5L3 19.5" stroke="#00C2FF" strokeWidth="1" opacity="0.4" />
    <circle cx="14" cy="14" r="3" fill="#00C2FF" opacity="0.8" />
  </svg>,
  // Business
  <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="10" width="22" height="15" rx="2" stroke="#1A3CFF" strokeWidth="1.5" />
    <path d="M9 10V7C9 5.34 10.34 4 12 4H16C17.66 4 19 5.34 19 7V10" stroke="#1A3CFF" strokeWidth="1.5" />
    <path d="M3 16H25" stroke="#1A3CFF" strokeWidth="1" opacity="0.5" />
    <circle cx="14" cy="16" r="2" fill="#1A3CFF" />
  </svg>,
  // System
  <svg key="3" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="3" width="10" height="10" rx="2" stroke="#FF2D95" strokeWidth="1.5" />
    <rect x="15" y="3" width="10" height="10" rx="2" stroke="#FF2D95" strokeWidth="1.5" />
    <rect x="3" y="15" width="10" height="10" rx="2" stroke="#FF2D95" strokeWidth="1.5" />
    <rect x="15" y="15" width="10" height="10" rx="2" stroke="#FF2D95" strokeWidth="1.5" />
    <path d="M8 13V15M20 13V15M13 8H15M13 20H15" stroke="#FF2D95" strokeWidth="1.5" />
  </svg>,
  // Growth
  <svg key="4" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M3 22L9 16L13 19L20 10L25 13" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6H25V12" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="25" cy="6" r="2" fill="#FFC300" opacity="0.5" />
  </svg>,
];

const gradients = [
  "from-[#00C2FF]/10 to-transparent border-[#00C2FF]/20 hover:border-[#00C2FF]/40 hover:shadow-[0_0_30px_rgba(0,194,255,0.15)]",
  "from-[#1A3CFF]/10 to-transparent border-[#1A3CFF]/20 hover:border-[#1A3CFF]/40 hover:shadow-[0_0_30px_rgba(26,60,255,0.15)]",
  "from-[#FF2D95]/10 to-transparent border-[#FF2D95]/20 hover:border-[#FF2D95]/40 hover:shadow-[0_0_30px_rgba(255,45,149,0.15)]",
  "from-[#FFC300]/10 to-transparent border-[#FFC300]/20 hover:border-[#FFC300]/40 hover:shadow-[0_0_30px_rgba(255,195,0,0.15)]",
];

export default function WhyUs() {
  const t = useTranslations("whyUs");

  const cards = [
    { title: t("card1Title"), desc: t("card1Desc") },
    { title: t("card2Title"), desc: t("card2Desc") },
    { title: t("card3Title"), desc: t("card3Desc") },
    { title: t("card4Title"), desc: t("card4Desc") },
  ];

  return (
    <section id="why-us" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,194,255,0.2)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
          subtitle={t("subtitle")}
          titleClassName="text-3xl md:text-4xl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-b ${gradients[i]} border backdrop-blur-sm transition-all duration-300 h-full`}
              >
                <div className="mb-4 w-14 h-14 rounded-xl glass flex items-center justify-center">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold text-[#EAEAEA] mb-2">{card.title}</h3>
                <p className="text-sm text-[rgba(234,234,234,0.6)] leading-relaxed">{card.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
