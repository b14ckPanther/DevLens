"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Locale = "ar" | "he" | "en";

const locales: { code: Locale; label: string }[] = [
  { code: "ar", label: "العربية" },
  { code: "he", label: "עברית" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setOpen(false);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const current = locales.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-[rgba(234,234,234,0.85)] hover:text-white border border-transparent hover:border-[rgba(0,194,255,0.3)] transition-all duration-200"
      >
        <span className="font-medium">{current.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 end-0 w-36 glass-stronger rounded-xl overflow-hidden shadow-xl z-50 border border-[rgba(255,255,255,0.08)]"
          >
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-start transition-colors duration-150 hover:bg-[rgba(0,194,255,0.08)] ${
                  l.code === locale
                    ? "text-[#00C2FF] bg-[rgba(0,194,255,0.05)]"
                    : "text-[rgba(234,234,234,0.8)]"
                }`}
              >
                {l.code === locale && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] flex-shrink-0" />
                )}
                <span className={l.code !== locale ? "ms-3.5" : ""}>{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
