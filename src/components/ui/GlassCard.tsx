"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "pink" | "none";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  onClick,
}: GlassCardProps) {
  const glowStyles = {
    blue: "hover:shadow-[0_0_30px_rgba(0,194,255,0.25),0_0_0_1px_rgba(0,194,255,0.2)]",
    pink: "hover:shadow-[0_0_30px_rgba(255,45,149,0.25),0_0_0_1px_rgba(255,45,149,0.2)]",
    none: "hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)]",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "glass rounded-2xl transition-all duration-300",
        hover && glowStyles[glow],
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
