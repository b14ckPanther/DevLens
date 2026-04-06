"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "#FF2D95",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: "#0077B5",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.11 8.11 0 004.74 1.52v-3.4a4.85 4.85 0 01-1-.12z"/>
      </svg>
    ),
    color: "#00E5FF",
  },
  {
    label: "Email",
    href: "mailto:hello@devlens.io",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    color: "#00C2FF",
  },
];

const footerLinks = [
  { key: "services", href: "#services" },
  { key: "work", href: "#work" },
  { key: "pricing", href: "#pricing" },
  { key: "contact", href: "#contact" },
];

export default function Footer() {
  const t = useTranslations("footer");

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#00C2FF] via-[#3A2BFF] via-[#FF2D95] to-[#FF4FD8]" />

      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#1A3CFF] opacity-[0.04] blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-28 h-28 flex-shrink-0 drop-shadow-[0_0_16px_rgba(0,194,255,0.35)]">
                <Image
                  src="/logo.png"
                  alt="DevLens logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">DevLens</span>
            </div>
            <p className="text-sm text-[rgba(234,234,234,0.5)] leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                className="text-sm text-[rgba(234,234,234,0.55)] hover:text-[#00C2FF] transition-colors duration-200"
              >
                {t(`links.${key}` as any)}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3 md:justify-end">
            {socials.map(({ label, href, icon, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass border border-[rgba(255,255,255,0.08)] flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ color: "rgba(234,234,234,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(234,234,234,0.6)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(234,234,234,0.35)]">{t("rights")}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-[rgba(234,234,234,0.3)]">Made with</span>
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" className="mx-0.5">
              <path d="M6 10.5C6 10.5 1 7 1 3.5C1 2.12 2.12 1 3.5 1C4.24 1 4.91 1.32 5.37 1.83L6 2.5L6.63 1.83C7.09 1.32 7.76 1 8.5 1C9.88 1 11 2.12 11 3.5C11 7 6 10.5 6 10.5Z" fill="#FF2D95" opacity="0.85"/>
            </svg>
            <span className="text-xs text-[rgba(234,234,234,0.3)]">by DevLens</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
