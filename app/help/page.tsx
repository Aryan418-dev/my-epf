"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2, FileText, HelpCircle, Sparkles, Copy, Check } from "lucide-react";
import { MOCK_USERS, type User } from "@/lib/mock-data";

export default function HelpPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);
  const [explained, setExplained] = useState(false);

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

  const rejected = user.claims.find((c) => c.status === "rejected");
  const processing = user.claims.find((c) => c.status === "processing" || c.status === "pending");
  const hasMismatch =
    user.kycStatus === "mismatch" ||
    user.issues.some((i) => i.toLowerCase().includes("mismatch"));

  const grievanceText = hasMismatch
    ? `My claim was rejected due to name / KYC mismatch. UAN: ${user.uan}. Name on record: ${user.name}. Please advise the correct process (joint declaration or Aadhaar update) so I can correct details and re-apply.`
    : `Please advise the status of my claim and any documents still required. UAN: ${user.uan}.`;

  function copyGrievance() {
    navigator.clipboard?.writeText(grievanceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h1 className="font-semibold text-slate-900">Help & next steps</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">What should I do?</h2>
          <p className="text-slate-600 text-sm">Plain-language guidance for this demo account.</p>
        </div>

        {(rejected || hasMismatch) && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-800">Explain my situation</span>
              </div>
              {!explained && (
                <button
                  type="button"
                  onClick={() => setExplained(true)}
                  className="text-xs font-semibold bg-indigo-700 text-white px-3 py-1.5 rounded-lg"
                >
                  Explain
                </button>
              )}
            </div>
            {explained ? (
              <div className="p-4 text-sm text-slate-700 space-y-3">
                <p>
                  {rejected
                    ? `Your claim (${rejected.type}) was rejected because of a name or KYC mismatch between EPFO records and Aadhaar.`
                    : "Your account shows a name / KYC mismatch. Filing a claim now has a high chance of rejection."}
                </p>
                <p>
                  <span className="font-medium text-slate-900">In simple terms:</span> the name on your UAN
                  does not match Aadhaar, so automated checks fail.
                </p>
                <p>
                  <span className="font-medium text-slate-900">What to do next:</span> correct the name
                  (employer joint declaration or Aadhaar update), re-check readiness, then file again.
                </p>
              </div>
            ) : (
              <div className="p-4 text-sm text-slate-500">
                Tap Explain for a plain-language summary.
              </div>
            )}
          </div>
        )}

        {hasMismatch ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-amber-50 px-4 py-3 flex items-center gap-2 border-b border-amber-100">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">Name / KYC mismatch</span>
            </div>
            <div className="p-4 space-y-4 text-sm text-slate-700">
              <p>Your name in EPFO records does not match Aadhaar. Claims are often rejected for this.</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Ask your employer to raise a joint declaration for name correction.</li>
                <li>Or update Aadhaar if that is the incorrect name.</li>
                <li>Re-check readiness, then re-submit.</li>
              </ol>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-slate-900 text-xs uppercase tracking-wide">Sample grievance text</p>
                  <button type="button" onClick={copyGrievance} className="flex items-center gap-1 text-xs text-indigo-700 font-medium">
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-slate-600 text-sm italic">{grievanceText}</p>
              </div>
            </div>
          </div>
        ) : processing ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Claim in progress</p>
              <p className="text-sm text-slate-600 mt-1">
                Your {processing.type} claim is processing. Typical time: 7–15 working days if KYC is correct.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900 text-sm">Your account looks ready</p>
              <p className="text-sm text-slate-600 mt-1">KYC verified, no major flags. You can start a claim.</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Common questions</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-slate-900">How long does a claim take?</p>
              <p className="text-slate-600">Usually 7–15 working days after documents and KYC are correct.</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">Why was my claim rejected?</p>
              <p className="text-slate-600">Common reasons: name mismatch, incomplete KYC, wrong bank details.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/readiness" className="flex items-center justify-center w-full border border-slate-300 text-slate-800 font-medium py-3 rounded-xl">
            Check readiness again
          </Link>
          <Link href="/claim" className="flex items-center justify-center gap-2 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl">
            <FileText className="w-5 h-5" />
            Start a claim
          </Link>
        </div>
      </main>
    </div>
  );
}
