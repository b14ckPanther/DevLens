"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "./ui/LanguageSwitcher";

const navLinks = [
  { key: "whyUs", href: "#why-us" },
  { key: "services", href: "#services" },
  { key: "work", href: "#work" },
  { key: "pricing", href: "#pricing" },
  { key: "story", href: "#story" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          (scrolled || mobileOpen)
            ? "py-3 bg-[#0A0A0F] lg:bg-[rgba(10,10,15,0.85)] lg:backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className="relative w-9 h-9 flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,194,255,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(0,194,255,0.65)] transition-all duration-300">
              <Image
                src="/logo.png"
                alt="DevLens logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-[#00C2FF] transition-colors duration-200">
              DevLens
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm text-[rgba(234,234,234,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all duration-200 font-medium"
              >
                {t(link.key)}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#1A3CFF] text-white shadow-[0_0_16px_rgba(0,194,255,0.3)] hover:shadow-[0_0_24px_rgba(0,194,255,0.5)] hover:scale-[1.03] transition-all duration-200"
            >
              {t("getStarted")}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl glass hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              aria-label="menu"
            >
              <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-[#EAEAEA] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 end-0 w-72 glass-stronger border-s border-[rgba(255,255,255,0.08)] p-6 pt-24 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-start px-4 py-3 text-base text-[rgba(234,234,234,0.8)] hover:text-white hover:bg-[rgba(0,194,255,0.06)] rounded-xl transition-all duration-200 font-medium"
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#1A3CFF] text-white hover:opacity-90 transition-opacity"
                >
                  {t("getStarted")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
