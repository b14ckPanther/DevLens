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
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0A0F]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1A3CFF] opacity-[0.05] blur-[100px]" />
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="px-4 py-2 glass border border-[rgba(255,255,255,0.1)] rounded-xl text-sm text-[rgba(234,234,234,0.7)] hover:text-white hover:border-white transition-colors flex items-center gap-2">
          &larr; Back to Website
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 glass border border-[rgba(255,255,255,0.08)] rounded-3xl m-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 mb-4 drop-shadow-[0_0_16px_rgba(0,194,255,0.3)]">
            <Image src="/logo.png" alt="DevLens" fill sizes="64px" className="object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">DevLens Admin</h1>
          <p className="text-sm text-[rgba(234,234,234,0.5)]">Enter the master password</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#00C2FF] transition-colors"
              required
            />
          </div>
          
          {error && <p className="text-sm text-[#FF2D95] text-center">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#00C2FF] to-[#3A2BFF] text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-all flex justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
