"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  LogOut,
  Wallet,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building2,
  ClipboardCheck,
} from "lucide-react";
import { MOCK_USERS, formatINR, type User } from "@/lib/mock-data";

export default function DashboardPage() {
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

  function handleLogout() {
    localStorage.removeItem("myepf_uan");
    router.push("/");
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const hasIssues = user.issues.length > 0 || user.kycStatus !== "verified";
  const activeClaim = user.claims.find((c) => c.status === "processing" || c.status === "pending");
  const rejectedClaim = user.claims.find((c) => c.status === "rejected");

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        Independent hackathon prototype · Not an official EPFO website
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-epf-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">MyEPF</p>
              <p className="text-xs text-slate-500">{user.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Balance card */}
        <div className="bg-epf-700 rounded-2xl p-5 text-white shadow-md">
          <div className="flex items-center gap-2 text-epf-100 text-sm mb-1">
            <Wallet className="w-4 h-4" />
            Total EPF Balance
          </div>
          <p className="text-3xl font-bold tracking-tight">{formatINR(user.balance)}</p>
          <p className="text-epf-200 text-sm mt-2">UAN · {user.uan}</p>
        </div>

        {/* Issues alert */}
        {hasIssues && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">Action needed</p>
                <ul className="mt-1 space-y-1">
                  {user.kycStatus === "mismatch" && (
                    <li className="text-sm text-amber-800">Name / KYC mismatch with Aadhaar</li>
                  )}
                  {user.issues.map((issue) => (
                    <li key={issue} className="text-sm text-amber-800">{issue}</li>
                  ))}
                </ul>
                <Link
                  href="/readiness"
                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-900 mt-2 hover:underline"
                >
                  Check readiness <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Active / Rejected claim */}
        {(activeClaim || rejectedClaim) && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Your claim</span>
            </div>
            <div className="p-4">
              {rejectedClaim && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{rejectedClaim.type}</p>
                    <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Rejected
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{formatINR(rejectedClaim.amount)} · {rejectedClaim.submittedOn}</p>
                  <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
                    {rejectedClaim.reason}
                  </p>
                  {rejectedClaim.nextAction && (
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">Next step:</span> {rejectedClaim.nextAction}
                    </p>
                  )}
                  <Link
                    href="/help"
                    className="inline-flex items-center gap-1 text-sm font-medium text-epf-700 mt-1 hover:underline"
                  >
                    How to fix this <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
              {activeClaim && !rejectedClaim && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{activeClaim.type}</p>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Processing
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{formatINR(activeClaim.amount)} · {activeClaim.submittedOn}</p>
                  {activeClaim.nextAction && (
                    <p className="text-sm text-slate-600">{activeClaim.nextAction}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/readiness"
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-epf-300 transition flex flex-col items-start gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-epf-100 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-epf-700" />
            </div>
            <span className="font-medium text-slate-900 text-sm">Check readiness</span>
          </Link>
          <Link
            href="/claim"
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-epf-300 transition flex flex-col items-start gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-epf-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-epf-700" />
            </div>
            <span className="font-medium text-slate-900 text-sm">Start a claim</span>
          </Link>
          <Link
            href="/help"
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-epf-300 transition flex flex-col items-start gap-2 col-span-2"
          >
            <div className="w-9 h-9 rounded-lg bg-epf-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-epf-700" />
            </div>
            <span className="font-medium text-slate-900 text-sm">Get help & next steps</span>
          </Link>
        </div>

        {/* Service history */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Service history</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {user.serviceHistory.map((job) => (
              <li key={job.memberId} className="px-4 py-3">
                <p className="font-medium text-slate-900 text-sm">{job.establishment}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.from} – {job.to} · {job.memberId}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-slate-400 pt-2">
          Bank account ending ····{user.bankLast4} · KYC: {user.kycStatus}
        </p>
      </main>
    </div>
  );
}