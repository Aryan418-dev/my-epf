"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2, FileText, HelpCircle } from "lucide-react";
import { MOCK_USERS, type User } from "@/lib/mock-data";

export default function HelpPage() {
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

  const hasMismatch = user.kycStatus === "mismatch" || user.issues.some((i) => i.toLowerCase().includes("mismatch"));

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
          <h1 className="font-semibold text-slate-900">Help & next steps</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">What should I do?</h2>
          <p className="text-slate-600 text-sm">
            Based on your mock account, here is clear guidance in plain language.
          </p>
        </div>

        {hasMismatch ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-amber-50 px-4 py-3 flex items-center gap-2 border-b border-amber-100">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">Name / KYC mismatch</span>
            </div>
            <div className="p-4 space-y-4 text-sm text-slate-700">
              <p>
                Your name in EPFO records does not match Aadhaar. Claims are often rejected for this reason.
              </p>
              <div>
                <p className="font-medium text-slate-900 mb-2">What to do (in real life):</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Ask your current employer to raise a joint declaration for name correction.</li>
                  <li>Or update your name in Aadhaar first if that is the incorrect one.</li>
                  <li>After the name matches, re-submit the claim.</li>
                </ol>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="font-medium text-slate-900 text-xs uppercase tracking-wide mb-1">Sample grievance text</p>
                <p className="text-slate-600 text-sm italic">
                  "My claim was rejected due to name mismatch. UAN: {user.uan}. Please advise on the correct process to update name and re-apply."
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Your account looks ready</p>
              <p className="text-sm text-slate-600 mt-1">
                KYC is verified and there are no major flags on this demo account. You can start a claim from the dashboard.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-epf-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Common questions</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-slate-900">How long does a claim take?</p>
              <p className="text-slate-600">Usually 7–15 working days after all documents and KYC are correct.</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">Why was my claim rejected?</p>
              <p className="text-slate-600">Most common reasons: name mismatch, incomplete KYC, wrong bank details, or missing employer approval.</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">Can I track my claim?</p>
              <p className="text-slate-600">Yes — on the dashboard you will see status and next steps when a claim exists.</p>
            </div>
          </div>
        </div>

        <Link
          href="/claim"
          className="flex items-center justify-center gap-2 w-full bg-epf-600 hover:bg-epf-700 text-white font-semibold py-3.5 rounded-xl"
        >
          <FileText className="w-5 h-5" />
          Start a claim
        </Link>

        <p className="text-center text-xs text-slate-400">
          Guidance is illustrative only. Always verify with official EPFO channels for real claims.
        </p>
      </main>
    </div>
  );
}