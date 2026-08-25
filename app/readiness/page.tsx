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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
    },
    {
      id: "bank",
      label: "Bank account linked",
      status: user.bankLast4 ? "pass" : "fail",
      detail: user.bankLast4
        ? `Account ending ····${user.bankLast4} is linked.`
        : "No bank account found. Add one before claiming.",
      icon: <CreditCard className="w-5 h-5" />,
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
    },
  ];

  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warn").length;
  const ready = failCount === 0 && warnCount === 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        Independent hackathon prototype · Not an official EPFO website
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
        <div
          className={`rounded-2xl p-5 ${
            ready
              ? "bg-green-50 border border-green-200"
              : failCount > 0
              ? "bg-red-50 border border-red-200"
              : "bg-amber-50 border border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {ready ? (
              <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0" />
            ) : failCount > 0 ? (
              <XCircle className="w-7 h-7 text-red-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-slate-900 text-lg">
                {ready
                  ? "You are ready to claim"
                  : failCount > 0
                  ? "Fix these issues first"
                  : "Almost ready – check warnings"}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {ready
                  ? "All key checks passed. You can start a claim with lower risk of rejection."
                  : "EPFO often rejects claims when KYC or name details do not match. Fix the failed items before submitting."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {checks.map((check) => (
              <li key={check.id} className="px-4 py-4 flex gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${\n                    check.status === "pass"
                      ? "bg-green-100 text-green-700"
                      : check.status === "fail"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {check.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900 text-sm">{check.label}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${\n                        check.status === "pass"
                          ? "bg-green-100 text-green-700"
                          : check.status === "fail"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {check.status === "pass" ? "OK" : check.status === "fail" ? "Fail" : "Warn"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{check.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          {ready ? (
            <Link
              href="/claim"
              className="w-full text-center bg-epf-600 hover:bg-epf-700 text-white font-semibold py-3.5 rounded-xl"
            >
              Start claim
            </Link>
          ) : (
            <Link
              href="/help"
              className="w-full text-center bg-epf-600 hover:bg-epf-700 text-white font-semibold py-3.5 rounded-xl"
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
        </div>
      </main>
    </div>
  );
}