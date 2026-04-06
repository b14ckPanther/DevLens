"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEventAction } from "@/app/actions/admin";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Check } from "lucide-react";

type BillingCycle = "monthly" | "yearly";
type PricingMode = "ownership" | "subscription";

export default function Pricing({ initialPlans = [] }: { initialPlans: any[] }) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [mode, setMode] = useState<PricingMode>("subscription");

  const handlePlanClick = async (planName: string) => {
    await trackEventAction({ 
      type: "plan_selection", 
      metadata: { 
        plan: planName, 
        billing 
      } 
    });
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const getPrice = (plan: any) => {
    const currency = "₪";
    const base = billing === "yearly" ? (plan.price_subscription_yearly || (plan.price_subscription * 12 * 0.8)) : plan.price_subscription;
    return `${currency}${Math.round(base).toLocaleString()}`;
  };

  const getPeriod = () => {
    if (mode === "ownership") {
      return billing === "monthly" ? t("oneTime") : t("yearlyMultiplier");
    }
    return billing === "monthly" ? t("perMonth") : t("perYear");
  };

  const features1 = (t.raw("features1") as string[]) || [];
  const features2 = (t.raw("features2") as string[]) || [];
  const features3 = (t.raw("features3") as string[]) || [];
  const featureArrays = [features1, features2, features3];

  return (
    <section id="pricing" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,195,0,0.2)] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
          subtitle={t("subtitle")}
        />        {/* Toggles */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 min-h-[60px]">
            {/* Billing toggle (Always visible now since subscription is default) */}
            <div className="flex items-center gap-3 glass rounded-full p-1.5 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-500 ${billing === "monthly"
                    ? "btn-gradient-gold scale-105 shadow-[0_0_18px_rgba(255,195,48,0.45)]"
                    : "text-[rgba(234,234,234,0.5)] hover:text-white"
                  }`}
              >
                {t("monthly")}
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-500 ${billing === "yearly"
                    ? "btn-gradient-gold scale-105 shadow-[0_0_18px_rgba(255,195,48,0.45)]"
                    : "text-[rgba(234,234,234,0.5)] hover:text-white"
                  }`}
              >
                {t("yearly")}
                {(() => {
                  const p = initialPlans[0];
                  if (!p) return null;
                  const yearly = p.price_subscription_yearly || (p.price_subscription * 12 * 0.8);
                  const monthlyTotal = p.price_subscription * 12;
                  const savings = Math.round((1 - (yearly / monthlyTotal)) * 100);
                  
                  if (savings <= 0) return null;
                  
                  return (
                    <span className="absolute -top-2 -end-2 px-2 py-0.5 text-[8px] font-black rounded-full bg-[#FFC300] text-black uppercase tracking-tighter whitespace-nowrap">
                      {t("savePercent", { percent: savings })}
                    </span>
                  );
                })()}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {initialPlans.map((plan, i) => {
            const planColor = i === 0 ? "#00C2FF" : i === 1 ? "#FF2D95" : "#3A2BFF";
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col transition-all duration-300 ${plan.is_popular
                      ? "border-2 scale-[1.03]"
                      : "glass border border-[rgba(255,255,255,0.08)]"
                    }`}
                  style={
                    plan.is_popular
                      ? {
                        background: "rgba(255,45,149,0.05)",
                        borderColor: "rgba(255,45,149,0.4)",
                        boxShadow: "0 0 40px rgba(255,45,149,0.15), 0 0 80px rgba(255,45,149,0.05)",
                      }
                      : {}
                  }
                >
                  {plan.is_popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF2D95] to-[#FF4FD8] text-white shadow-[0_0_16px_rgba(255,45,149,0.5)]">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="inline-block me-1"><path d="M5.5 1L10 5.5L5.5 10L1 5.5L5.5 1Z" fill="white" opacity="0.9" /><circle cx="5.5" cy="5.5" r="1.5" fill="#FFE066" /></svg> {t("popular")}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="text-xl font-bold text-[#EAEAEA] mb-2">
                    {locale === "ar" ? plan.name_ar : (locale === "he" ? plan.name_he : plan.name_en)}
                  </h3>
                  <p className="text-sm text-[rgba(234,234,234,0.55)] mb-6">
                    {locale === "ar" ? plan.description_ar : (locale === "he" ? plan.description_he : plan.description_en)}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${billing}-${mode}-${i}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-end gap-2"
                      >
                        <span
                          className="text-4xl font-extrabold"
                          style={{ color: planColor }}
                        >
                          {getPrice(plan)}
                        </span>
                        <span className="text-sm text-[rgba(234,234,234,0.5)] pb-1">{getPeriod()}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {((locale === "ar" ? plan.features_ar : locale === "he" ? plan.features_he : plan.features_en) || []).map((feature: string, fi: number) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-[rgba(234,234,234,0.75)]">
                        <Check
                          size={15}
                          className="shrink-0 rounded-full p-0.5"
                          style={{ color: planColor, background: `${planColor}15` }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => handlePlanClick(locale === "ar" ? plan.name_ar : (locale === "he" ? plan.name_he : plan.name_en))}
                    className={`w-full rounded-2xl py-4 text-sm font-black transition-all duration-300 hover:scale-[1.02] ${plan.is_popular
                        ? "bg-gradient-to-r from-[#FF2D95] to-[#FF4FD8] text-white shadow-[0_0_20px_rgba(255,45,149,0.4)] hover:shadow-[0_0_30px_rgba(255,45,149,0.6)]"
                        : "btn-gradient-gold shadow-[0_0_20px_rgba(255,195,48,0.3)] hover:shadow-[0_0_28px_rgba(255,195,48,0.45)]"
                      }`}
                  >
                    {t("ctaLabel")}
                  </button>

                  {/* Ownership Alternative */}
                  <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
                    <p className="text-[10px] text-[rgba(234,234,234,0.35)] uppercase font-black tracking-[0.2em] mb-3">
                      {t("ownershipQuestion")}
                    </p>
                    <button
                      onClick={() => {
                        handlePlanClick(`${plan.name_en} (Ownership)`);
                      }}
                      className="group flex flex-col items-center gap-1 w-full"
                    >
                      <span className="text-[11px] font-bold text-[rgba(234,234,234,0.6)] transition-colors group-hover:text-[#ffc330]">
                        {t("ownWebsite", { price: plan.price_one_time?.toLocaleString() || "0" })}
                      </span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
