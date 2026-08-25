"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Building2,
  CreditCard,
  User,
} from "lucide-react";
import { MOCK_USERS, type User } from "@/lib/mock-data";

interface CheckItem {
  id: string;
  label: string;
  status: "pass" | "fail" | "warn";
  detail: string;
  icon: ReactNode;
  weight: number;
}

export default function ReadinessPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const uan = localStorage.getItem("myepf_uan");
    if (!uan || !MOCK_USERS[uan]) {
      router.replace("/login");
      return;
    }
    setUser(MOCK_USERS[uan]);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pb-24">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const checks: CheckItem[] = [
    {
      id: "kyc",
      label: "KYC / Aadhaar link",
      status: user.kycStatus === "verified" ? "pass" : user.kycStatus === "mismatch" ? "fail" : "warn",
      detail:
        user.kycStatus === "verified"
          ? "Aadhaar and KYC details are verified."
          : user.kycStatus === "mismatch"
          ? "Name or details do not match Aadhaar. Claims will likely be rejected."
          : "KYC is still pending verification.",
      icon: <User className="w-5 h-5" />,
      weight: 35,
    },
    {
      id: "bank",
      label: "Bank account linked",
      status: user.bankLast4 ? "pass" : "fail",
      detail: user.bankLast4
        ? `Account ending ····${user.bankLast4} is linked.`
        : "No bank account found. Add one before claiming.",
      icon: <CreditCard className="w-5 h-5" />,
      weight: 25,
    },
    {
      id: "employer",
      label: "Active employment record",
      status: user.serviceHistory.length > 0 ? "pass" : "warn",
      detail:
        user.serviceHistory.length > 0
          ? `${user.serviceHistory.length} establishment(s) on record.`
          : "No service history found.",
      icon: <Building2 className="w-5 h-5" />,
      weight: 20,
    },
    {
      id: "issues",
      label: "Open issues",
      status: user.issues.length === 0 ? "pass" : "fail",
      detail:
        user.issues.length === 0
          ? "No open issues on this account."
          : user.issues.join("; "),
      icon: <Shield className="w-5 h-5" />,
      weight: 20,
    },
  ];

  // Score from actual rules: pass = full weight, warn = half, fail = 0
  const score = Math.round(
    checks.reduce((sum, c) => {
      if (c.status === "pass") return sum + c.weight;
      if (c.status === "warn") return sum + c.weight * 0.5;
      return sum;
    }, 0)
  );

  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const ready = failCount === 0 && warnCount === 0;

  function statusColor(status: string) {
    if (status === "pass") return "bg-green-100 text-green-700";
    if (status === "fail") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  }

  function overallBox() {
    if (ready) return "bg-green-50 border border-green-200";
    if (failCount > 0) return "bg-red-50 border border-red-200";
    return "bg-amber-50 border border-amber-200";
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-center text-xs sm:text-sm text-amber-900">
        JANSEVA is an independent prototype. Not an official government service. All data is synthetic.
      </div>

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="font-semibold text-slate-900">Claim readiness</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div className={`rounded-2xl p-5 ${overallBox()}`}>
          <div className="flex items-start gap-3">
            {ready ? (
              <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0" />
            ) : failCount > 0 ? (
              <XCircle className="w-7 h-7 text-red-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-bold text-slate-900 text-lg">Claim readiness: {score}%</p>
              <p className="text-sm text-slate-600 mt-1">
                {ready
                  ? "All key checks passed. You can start a claim with lower risk of rejection."
                  : failCount > 0
                  ? "Fix failed items before submitting — EPFO often rejects mismatched KYC/name claims."
                  : "Almost ready — review warnings below."}
              </p>
              <div className="mt-3 h-2.5 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    score >= 90 ? "bg-green-600" : score >= 60 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {checks.map((check) => (
              <li key={check.id} className="px-4 py-4 flex gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${statusColor(check.status)}`}
                >
                  {check.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900 text-sm">{check.label}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(check.status)}`}>
                      {check.status === "pass" ? "OK" : check.status === "fail" ? "Fail" : "Warn"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{check.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-900 text-sm mb-1">What you should do next</p>
          <p className="text-sm text-slate-600">
            {ready
              ? "Start a claim from the guided wizard. Keep bank details ready."
              : failCount > 0
              ? "Resolve name/KYC or bank issues first, then re-check readiness."
              : "Review warnings, then decide if you still want to file."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {ready ? (
            <Link
              href="/claim"
              className="w-full text-center bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl"
            >
              Start claim
            </Link>
          ) : (
            <Link
              href="/help"
              className="w-full text-center bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl"
            >
              See how to fix issues
            </Link>
          )}
          <Link
            href="/dashboard"
            className="w-full text-center border border-slate-300 text-slate-700 font-medium py-3 rounded-xl"
          >
            Back to dashboard
          </Link>
          <Link href="/epf" className="w-full text-center text-sm text-indigo-700 font-medium py-1">
            EPF hub
          </Link>
        </div>
      </main>
    </div>
  );
}
