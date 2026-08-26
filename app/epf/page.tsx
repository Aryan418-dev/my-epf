"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, ClipboardCheck, FileText, HelpCircle, LogIn } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { MOCK_USERS, formatINR, type User } from "@/lib/mock-data";

const DEMOS = [
  { uan: "100123456789", label: "Clean · ready", color: "border-green-200 bg-green-50" },
  { uan: "100987654321", label: "Mismatch · blocked", color: "border-amber-200 bg-amber-50" },
  { uan: "100555666777", label: "Claim processing", color: "border-blue-200 bg-blue-50" },
];

export default function EpfHubPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const uan = localStorage.getItem("myepf_uan");
    if (uan && MOCK_USERS[uan]) setUser(MOCK_USERS[uan]);
  }, []);

  function quickLogin(uan: string) {
    localStorage.setItem("myepf_uan", uan);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="font-semibold text-slate-900">EPF Claim & Status</h1>
            <p className="text-xs text-slate-500">Pension & Benefits · Working prototype</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <p className="text-sm text-slate-600">
          Check balance, claim readiness, file a guided claim, and get plain-language help. All data is synthetic.
        </p>

        {!user ? (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900 mb-1">One-tap demo login</p>
              <p className="text-sm text-slate-600 mb-4">Pick a scenario — no password typing needed.</p>
              <div className="space-y-2">
                {DEMOS.map((d) => (
                  <button
                    key={d.uan}
                    type="button"
                    onClick={() => quickLogin(d.uan)}
                    className={`w-full text-left rounded-xl border px-4 py-3 ${d.color}`}
                  >
                    <p className="font-medium text-sm text-slate-900">{d.label}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{d.uan}</p>
                  </button>
                ))}
              </div>
            </div>
            <Link
              href="/login?next=/dashboard"
              className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-700 py-2"
            >
              <LogIn className="w-4 h-4" /> Full login page
            </Link>
          </div>
        ) : (
          <div className="bg-indigo-700 rounded-2xl p-5 text-white">
            <p className="text-indigo-100 text-sm flex items-center gap-1.5">
              <Wallet className="w-4 h-4" /> Total EPF balance
            </p>
            <p className="text-2xl font-bold mt-1">{formatINR(user.balance)}</p>
            <p className="text-indigo-200 text-sm mt-1">{user.name} · UAN {user.uan}</p>
            <Link href="/dashboard" className="inline-block mt-3 text-sm font-medium underline text-white">
              Open full dashboard →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={user ? "/readiness" : "/login?next=/readiness"}
            className="bg-white rounded-2xl border border-slate-200 p-4 active:bg-slate-50"
          >
            <ClipboardCheck className="w-6 h-6 text-indigo-700 mb-2" />
            <p className="font-medium text-sm text-slate-900">Claim readiness</p>
          </Link>
          <Link
            href={user ? "/claim" : "/login?next=/claim"}
            className="bg-white rounded-2xl border border-slate-200 p-4 active:bg-slate-50"
          >
            <FileText className="w-6 h-6 text-indigo-700 mb-2" />
            <p className="font-medium text-sm text-slate-900">Start a claim</p>
          </Link>
          <Link
            href={user ? "/help" : "/login?next=/help"}
            className="bg-white rounded-2xl border border-slate-200 p-4 col-span-2 active:bg-slate-50"
          >
            <HelpCircle className="w-6 h-6 text-indigo-700 mb-2" />
            <p className="font-medium text-sm text-slate-900">Help & explain rejection</p>
          </Link>
        </div>

        {user && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("myepf_uan");
              setUser(null);
            }}
            className="w-full text-sm text-slate-500 py-2"
          >
            Switch demo account
          </button>
        )}
      </main>
    </div>
  );
}
