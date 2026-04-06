"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "warm";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function GlowButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className,
  type = "button",
  disabled,
}: GlowButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#00C2FF] via-[#1A3CFF] to-[#3A2BFF] text-white shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:shadow-[0_0_35px_rgba(0,194,255,0.6)] hover:scale-[1.03]",
    ghost:
      "bg-transparent border border-[rgba(255,255,255,0.15)] text-[#EAEAEA] hover:border-[#00C2FF] hover:text-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.2)]",
    warm:
      "bg-gradient-to-r from-[#FF6A00] via-[#FF2D95] to-[#FF4FD8] text-white shadow-[0_0_20px_rgba(255,45,149,0.4)] hover:shadow-[0_0_35px_rgba(255,45,149,0.6)] hover:scale-[1.03]",
  };

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer select-none",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.button>
  );
}
