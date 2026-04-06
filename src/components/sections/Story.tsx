"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

function useCountUp(target: number, duration = 2000, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);

  return count;
}

function CounterStat({ value, label, color }: { value: number; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, 1800, inView);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className="text-5xl font-extrabold" style={{ color }}>
        {count}+
      </span>
      <span className="text-sm text-[rgba(234,234,234,0.55)]">{label}</span>
    </div>
  );
}

export default function Story({ stats }: { stats?: { projectsCount: number, clientsCount: number, yearsExperience: number } }) {
  const t = useTranslations("story");

  // Fallbacks if stats not provided
  const projCount = stats?.projectsCount || 50;
  const clientCount = stats?.clientsCount || 40;
  const yrsCount = stats?.yearsExperience || 3;

  return (
    <section id="story" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.2)] to-transparent" />
        <div className="absolute bottom-0 start-0 w-[400px] h-[400px] rounded-full bg-[#1A3CFF] opacity-[0.05] blur-[100px]" />
        <div className="absolute top-0 end-0 w-[300px] h-[300px] rounded-full bg-[#FF2D95] opacity-[0.04] blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <div className="space-y-5">
            {[t("p1"), t("p2"), t("p3")].map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <p className="text-lg text-[rgba(234,234,234,0.7)] leading-relaxed">
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Visual card */}
          <ScrollReveal direction="left">
            <div className="relative rounded-3xl glass border border-[rgba(255,255,255,0.08)] p-8 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 end-0 w-40 h-40 rounded-full bg-[#00C2FF] opacity-[0.07] blur-[60px]" />
                <div className="absolute bottom-0 start-0 w-40 h-40 rounded-full bg-[#FF2D95] opacity-[0.07] blur-[60px]" />
              </div>

              {/* Logo big */}
              <div className="relative z-10 flex items-center gap-4 mb-8">
                <div className="relative w-16 h-16 flex-shrink-0 drop-shadow-[0_0_20px_rgba(0,194,255,0.5)]">
                    <Image
                      src="/logo.png"
                      alt="DevLens logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                      unoptimized
                    />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-white">DevLens</h4>
                  <p className="text-sm text-[rgba(234,234,234,0.5)]">{t("studioSubtitle")}</p>
                </div>
              </div>

              {/* Values */}
              {[t("val1"), t("val2"), t("val3"), t("val4")].map((val, i) => (
                <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
                  <span className="text-sm text-[rgba(234,234,234,0.65)]">{val}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Counter stats */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-6 glass rounded-3xl border border-[rgba(255,255,255,0.08)] p-8">
            <CounterStat value={projCount} label={t("stat1Label")} color="#00C2FF" />
            <div className="w-px bg-[rgba(255,255,255,0.08)] mx-auto" />
            <CounterStat value={clientCount} label={t("stat2Label")} color="#FF2D95" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
