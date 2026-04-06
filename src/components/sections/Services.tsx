"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

const serviceIcons = [
  // Digital Business Card
  <svg key="s1" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="2" y="7" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 11H20M13 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Landing Page
  <svg key="s2" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="2" y="4" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 9H24" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5.5" cy="6.5" r="1" fill="currentColor"/>
    <circle cx="8.5" cy="6.5" r="1" fill="currentColor"/>
    <circle cx="11.5" cy="6.5" r="1" fill="currentColor"/>
    <rect x="6" y="12" width="14" height="2" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="9" y="16" width="8" height="2" rx="1" fill="currentColor" opacity="0.3"/>
  </svg>,
  // Digital Menu
  <svg key="s3" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="5" y="2" width="16" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 8H17M9 12H17M9 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Appointment
  <svg key="s4" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="3" y="5" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 11H23" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 3V7M18 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 15L11 18L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // Booking System
  <svg key="s5" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 7V13L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="13" cy="13" r="2" fill="currentColor" opacity="0.5"/>
  </svg>,
  // Marketplace
  <svg key="s6" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M3 5H23L21 14H5L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 14L7 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Custom Web App
  <svg key="s7" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="2" y="4" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 13L6 16L9 19M17 13L20 16L17 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 10L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
  </svg>,
  // Mobile App
  <svg key="s8" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="6" y="2" width="14" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 20H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="13" cy="20" r="0.5" fill="currentColor"/>
    <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    <path d="M6 5H20" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
  </svg>,
];

const colors = [
  { text: "#00C2FF", bg: "rgba(0,194,255,0.08)", border: "rgba(0,194,255,0.2)" },
  { text: "#1A3CFF", bg: "rgba(26,60,255,0.08)", border: "rgba(26,60,255,0.2)" },
  { text: "#FF2D95", bg: "rgba(255,45,149,0.08)", border: "rgba(255,45,149,0.2)" },
  { text: "#FFC300", bg: "rgba(255,195,0,0.08)", border: "rgba(255,195,0,0.2)" },
  { text: "#00E5FF", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.2)" },
  { text: "#3A2BFF", bg: "rgba(58,43,255,0.08)", border: "rgba(58,43,255,0.2)" },
  { text: "#FF4FD8", bg: "rgba(255,79,216,0.08)", border: "rgba(255,79,216,0.2)" },
];

export default function Services() {
  const t = useTranslations("services");
  const [hovered, setHovered] = useState<number | null>(null);

  const services = [
    { titleKey: "s1Title", descKey: "s1Desc" },
    { titleKey: "s2Title", descKey: "s2Desc" },
    { titleKey: "s3Title", descKey: "s3Desc" },
    { titleKey: "s4Title", descKey: "s4Desc" },
    { titleKey: "s5Title", descKey: "s5Desc" },
    { titleKey: "s6Title", descKey: "s6Desc" },
    { titleKey: "s7Title", descKey: "s7Desc" },
    { titleKey: "s8Title", descKey: "s8Desc" },
  ];

  return (
    <section id="services" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,45,149,0.2)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((svc, i) => {
            const color = colors[i % colors.length];
            const isHovered = hovered === i;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative h-full flex flex-col p-6 rounded-2xl glass border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden cursor-default"
                  style={{
                    boxShadow: isHovered ? `0 0 30px ${color.bg}, 0 0 0 1px ${color.border}` : undefined,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHovered ? color.bg : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isHovered ? color.border : "rgba(255,255,255,0.08)"}`,
                      color: color.text,
                    }}
                  >
                    {serviceIcons[i]}
                  </div>

                  <h3 className="text-base font-bold text-[#EAEAEA] mb-2 group-hover:text-white transition-colors">
                    {t(svc.titleKey as any)}
                  </h3>
                  <p className="text-sm text-[rgba(234,234,234,0.55)] leading-relaxed mb-4">
                    {t(svc.descKey as any)}
                  </p>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                          style={{ color: color.text }}
                          onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          {t("askAbout")} <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block ms-1 rtl:rotate-180"><path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
