"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  highlight: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
  titleClassName?: string;
}

export default function SectionTitle({
  label,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-start",
        className
      )}
    >
      {label && (
        <span className="mb-4 inline-block rounded-full border border-[rgba(255,195,48,0.35)] bg-[rgba(255,195,48,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
          <span className="gradient-text-highlight">{label}</span>
        </span>
      )}
      <h2 className={cn("text-4xl md:text-5xl font-bold leading-tight text-[#EAEAEA] mb-3", titleClassName)}>
        {title}{" "}
        <span className="gradient-text-highlight">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-md text-[rgba(234,234,234,0.7)] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#ffc330]" />
        <div className="h-1 w-6 rounded-full bg-gradient-to-r from-[#ffd666] to-[#c9830a]" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#ffc330]" />
      </div>
    </motion.div>
  );
}
