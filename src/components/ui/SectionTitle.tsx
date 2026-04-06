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
        <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-[rgba(0,194,255,0.1)] border border-[rgba(0,194,255,0.2)] text-[#00C2FF]">
          {label}
        </span>
      )}
      <h2 className={cn("text-4xl md:text-5xl font-bold leading-tight text-[#EAEAEA] mb-3", titleClassName)}>
        {title}{" "}
        <span className="gradient-text-blue">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-md text-[rgba(234,234,234,0.7)] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center gap-2 justify-center">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00C2FF]" />
        <div className="h-1 w-6 rounded-full bg-[#00C2FF]" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00C2FF]" />
      </div>
    </motion.div>
  );
}
