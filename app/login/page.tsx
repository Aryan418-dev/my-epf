"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { MOCK_USERS } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [uan, setUan] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = MOCK_USERS[uan.trim()];
      if (!user || user.password !== password) {
        setError("Invalid UAN or password. Try one of the demo accounts below.");
        setLoading(false);
        return;
      }

      // Store mock session
      if (typeof window !== "undefined") {
        localStorage.setItem("myepf_uan", uan.trim());
      }
      router.push("/dashboard");
    }, 600);
  }

  function quickLogin(demoUan: string) {
    setUan(demoUan);
    setPassword("demo123");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        Independent hackathon prototype · Not an official EPFO website
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-10">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-epf-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Sign in to MyEPF</h1>
              <p className="text-sm text-slate-500">Use a demo UAN below</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div>
              <label htmlFor="uan" className="block text-sm font-medium text-slate-700 mb-1.5">
                UAN (Universal Account Number)
              </label>
              <input
                id="uan"
                type="text"
                inputMode="numeric"
                value={uan}
                onChange={(e) => setUan(e.target.value)}
                placeholder="e.g. 100123456789"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-epf-500 focus:ring-2 focus:ring-epf-200 outline-none transition text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo123"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-epf-500 focus:ring-2 focus:ring-epf-200 outline-none transition text-base"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-epf-600 hover:bg-epf-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Quick demo login</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => quickLogin("100123456789")}
                className="w-full text-left text-sm px-3 py-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
              >
                <span className="font-mono text-epf-700">100123456789</span>
                <span className="text-slate-500 ml-2">— Clean account</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin("100987654321")}
                className="w-full text-left text-sm px-3 py-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
              >
                <span className="font-mono text-epf-700">100987654321</span>
                <span className="text-slate-500 ml-2">— Name mismatch</span>
              </button>
              <button
                type="button"
                onClick={() => quickLogin("100555666777")}
                className="w-full text-left text-sm px-3 py-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
              >
                <span className="font-mono text-epf-700">100555666777</span>
                <span className="text-slate-500 ml-2">— Claim in progress</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}