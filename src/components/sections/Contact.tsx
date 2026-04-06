"use client";
import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckCircle, Mail, Phone, MessageCircle } from "lucide-react";
import { submitLeadAction } from "@/app/actions/admin";

/** Inline gradient so Tailwind utilities on the same node cannot strip `background-image` */
const SUBMIT_GOLD_GRADIENT =
  "linear-gradient(135deg, #ffe08a 0%, #ffc330 40%, #f0a818 75%, #c9830a 100%)";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    businessType: "",
    notes: "",
  });

  const services = (t.raw("services") as string[]) || [];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitLeadAction(form);
    setSubmitting(false);
    if (res.error) {
      alert(res.error);
    } else {
      setSubmitted(true);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl glass border border-[rgba(255,255,255,0.08)] bg-transparent text-[#EAEAEA] placeholder:text-[rgba(234,234,234,0.3)] text-sm outline-none focus:border-[rgba(255,195,48,0.45)] focus:shadow-[0_0_16px_rgba(255,195,48,0.12)] transition-all duration-200";

  return (
    <section id="contact" className="section-padding px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,79,216,0.2)] to-transparent" />
        <div className="absolute bottom-0 end-0 w-[500px] h-[500px] rounded-full bg-[#FF2D95] opacity-[0.04] blur-[120px]" />
        <div className="absolute top-0 start-0 w-[400px] h-[400px] rounded-full bg-[#00C2FF] opacity-[0.04] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t("sectionLabel")}
          title={t("title")}
          highlight={t("titleHighlight")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <div className="glass-stronger rounded-3xl border border-[rgba(255,255,255,0.1)] p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute end-0 top-0 h-48 w-48 rounded-full bg-[#ffc330] opacity-[0.06] blur-[60px]" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(255,195,48,0.12)] shadow-[0_0_30px_rgba(255,195,48,0.35)]">
                      <CheckCircle size={40} className="text-[#ffc330]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#EAEAEA] mb-2">{t("successTitle")}</h3>
                    <p className="text-[rgba(234,234,234,0.6)]">{t("successMsg")}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        placeholder={t("name")}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputBase}
                      />
                      <input
                        required
                        type="email"
                        placeholder={t("email")}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputBase}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        placeholder={t("phone")}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputBase}
                      />
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={`${inputBase} cursor-pointer`}
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" disabled style={{ background: "#0A0A0F" }}>
                          {t("selectService")}
                        </option>
                        {services.map((s, i) => (
                          <option key={i} value={s} style={{ background: "#0A0A0F" }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      placeholder={t("businessType")}
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className={inputBase}
                    />

                    <textarea
                      rows={4}
                      placeholder={t("notes")}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className={`${inputBase} resize-none`}
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-xl border-0 py-4 text-base font-bold text-[#0a0a0f] shadow-[0_0_24px_rgba(255,195,48,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,195,48,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                      style={{
                        backgroundImage: SUBMIT_GOLD_GRADIENT,
                        backgroundSize: submitting ? "300% 300%" : "100% 100%",
                        animation: submitting ? "gradient-shift 2s ease infinite" : undefined,
                      }}
                    >
                      {submitting ? t("submitting") : t("submit")}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Side info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              {/* Quick contact */}
              <div className="glass rounded-2xl border border-[rgba(255,255,255,0.08)] p-6">
                <h4 className="text-base font-bold text-[#EAEAEA] mb-4 pb-3 border-b border-[rgba(255,255,255,0.06)]">
                  {t("orContact")}
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: <Phone size={16} />, label: t("whatsapp"), color: "#25D366" },
                    { icon: <MessageCircle size={16} />, label: t("instagram"), color: "#FF2D95" },
                    { icon: <Mail size={16} />, label: t("email2"), color: "#00C2FF" },
                  ].map(({ icon, label, color }, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl glass hover:bg-[rgba(255,255,255,0.04)] transition-colors group"
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ background: `${color}15`, color }}
                      >
                        {icon}
                      </span>
                      <span className="text-sm font-medium text-[rgba(234,234,234,0.75)] group-hover:text-white transition-colors">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Promise card */}
              <div
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(255,195,48,0.1), rgba(201,131,10,0.06))",
                  border: "1px solid rgba(255,195,48,0.22)",
                }}
              >
                <div className="mb-3">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M16 3L6 16H13L11 25L22 12H15L16 3Z" fill="#ffc330" opacity="0.95"/>
                  </svg>
                </div>
                <h4 className="font-bold text-[#EAEAEA] mb-2">{t("promiseTitle")}</h4>
                <p className="text-sm text-[rgba(234,234,234,0.55)]">
                  {t("promiseDesc")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
