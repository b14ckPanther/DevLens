"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0F]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc330] opacity-[0.06] blur-[100px]" />
      </div>

      <div className="absolute left-8 top-8 z-20">
        <Link
          href="/"
          className="glass flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.1)] px-4 py-2 text-sm text-[rgba(234,234,234,0.7)] transition-colors hover:border-[rgba(255,195,48,0.35)] hover:text-[#EAEAEA]"
        >
          &larr; Back to Website
        </Link>
      </div>

      <div className="relative z-10 m-4 w-full max-w-md rounded-3xl border border-[rgba(255,195,48,0.12)] glass p-8 shadow-[0_0_40px_rgba(255,195,48,0.06)]">
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4 h-20 w-20 drop-shadow-[0_0_16px_rgba(255,195,48,0.35)]">
            <Image src="/logo.png" alt="DevLens" fill sizes="80px" className="object-contain" priority unoptimized />
          </div>
          <h1 className="text-2xl font-extrabold">
            <span className="text-[#EAEAEA]">Dev</span>
            <span className="text-[#ffc330]">Lens</span>
            <span className="text-[#EAEAEA]"> Admin</span>
          </h1>
          <p className="mt-1 text-sm text-[rgba(234,234,234,0.5)]">Enter the master password</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-white placeholder-[rgba(255,255,255,0.3)] transition-colors focus:border-[rgba(255,195,48,0.5)] focus:outline-none focus:shadow-[0_0_16px_rgba(255,195,48,0.12)]"
              required
            />
          </div>

          {error && <p className="text-center text-sm text-[#FF2D95]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient-gold flex w-full justify-center rounded-xl py-3 font-bold shadow-[0_0_20px_rgba(255,195,48,0.35)] transition-all hover:shadow-[0_0_28px_rgba(255,195,48,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0a0a0f] border-t-transparent" />
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
