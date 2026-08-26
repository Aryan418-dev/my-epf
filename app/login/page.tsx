"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { MOCK_USERS } from "@/lib/mock-data";

const DEMO_ACCOUNTS = [
  { uan: "100123456789", label: "Clean account — ready to claim", hint: "KYC OK, no issues" },
  { uan: "100987654321", label: "Name mismatch — rejected claim", hint: "Shows readiness fail + help" },
  { uan: "100555666777", label: "Claim in progress", hint: "Processing status on dashboard" },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const [uan, setUan] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function loginWith(u: string, p: string = "demo123") {
    setError("");
    if (!MOCK_USERS[u] || p !== "demo123") {
      setError("Invalid UAN or password. Use a demo account below.");
      return;
    }
    localStorage.setItem("myepf_uan", u);
    const safe = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
    router.push(safe);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginWith(uan.trim(), password);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-center text-xs sm:text-sm text-amber-900">
        JANSEVA is an independent prototype. Not an official government service. All data is synthetic.
      </div>

      <div className="max-w-md mx-auto px-4 pt-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-indigo-700 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">EPF demo login</h1>
            <p className="text-sm text-slate-500">JANSEVA · One tap below is enough</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-700 mb-3">Quick demo accounts</p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.uan}
                type="button"
                onClick={() => loginWith(acc.uan)}
                className="w-full text-left bg-white border border-slate-200 hover:border-indigo-400 active:bg-slate-50 rounded-xl px-4 py-3.5 transition"
              >
                <p className="font-medium text-slate-900 text-sm">{acc.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{acc.uan} · demo123</p>
                <p className="text-xs text-indigo-700 mt-1">{acc.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Or enter manually</p>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">UAN</label>
            <input
              type="text"
              inputMode="numeric"
              value={uan}
              onChange={(e) => setUan(e.target.value)}
              placeholder="12-digit UAN"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo123"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8">
          No real OTPs, Aadhaar or EPFO systems are used.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
