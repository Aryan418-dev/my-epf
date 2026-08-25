"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { MOCK_USERS, formatINR, type User } from "@/lib/mock-data";

type Step = 1 | 2 | 3 | 4;

export default function ClaimPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [claimType, setClaimType] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");

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

  const canClaim = user.kycStatus === "verified" && user.issues.length === 0;

  function handleSubmit() {
    setRefNo("CLM-MOCK-" + Date.now().toString().slice(-6));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-center text-xs sm:text-sm text-amber-900">
          JANSEVA is an independent prototype. Not an official government service. All data is synthetic.
        </div>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Claim submitted</h1>
          <p className="text-slate-600 mb-6">
            Mock submission only. No real claim was filed with EPFO.
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-left mb-8">
            <p className="text-sm text-slate-500">Claim type</p>
            <p className="font-medium text-slate-900">{claimType}</p>
            <p className="text-sm text-slate-500 mt-3">Amount</p>
            <p className="font-medium text-slate-900">{formatINR(Number(amount) || 0)}</p>
            <p className="text-sm text-slate-500 mt-3">Reference</p>
            <p className="font-mono text-sm text-indigo-700">{refNo}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-3 rounded-xl"
            >
              Back to dashboard
            </Link>
            <Link href="/applications" className="text-sm font-medium text-indigo-700">
              View applications →
            </Link>
          </div>
        </div>
      </div>
    );
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
          <div>
            <h1 className="font-semibold text-slate-900">Start a claim</h1>
            <p className="text-xs text-slate-500">Step {step} of 4</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-indigo-600" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {!canClaim && step === 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">You may face rejection</p>
              <p className="text-sm text-amber-800 mt-1">
                Your account has KYC or name issues. You can still preview the flow; in real life fix these first.
              </p>
              <Link href="/help" className="text-sm font-medium text-amber-900 underline mt-2 inline-block">
                How to fix issues →
              </Link>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What kind of claim?</h2>
            <p className="text-slate-600 text-sm">Choose the option that matches your situation.</p>
            <div className="space-y-3">
              {[
                "Final Settlement (leaving job)",
                "Partial Withdrawal – Medical",
                "Partial Withdrawal – Education",
                "Partial Withdrawal – Housing",
                "Advance for marriage",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setClaimType(type);
                    setStep(2);
                  }}
                  className="w-full text-left bg-white border border-slate-200 hover:border-indigo-400 rounded-xl px-4 py-3.5 font-medium text-slate-900 transition"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900">How much do you need?</h2>
            <p className="text-slate-600 text-sm">
              Available balance: <span className="font-semibold text-slate-900">{formatINR(user.balance)}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (₹)</label>
              <input
                type="number"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base"
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium text-slate-700">
                Back
              </button>
              <button
                type="button"
                disabled={!amount || Number(amount) <= 0 || Number(amount) > user.balance}
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Confirm bank details</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-500">Bank account</p>
                <p className="font-medium text-slate-900">···· ···· ···· {user.bankLast4}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Name on account</p>
                <p className="font-medium text-slate-900">{user.name}</p>
              </div>
              <p className="text-sm text-slate-600">Mock only — no real transfer.</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium text-slate-700">
                Back
              </button>
              <button type="button" onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Review & submit</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Claim type</span>
                <span className="font-medium text-slate-900 text-sm text-right max-w-[60%]">{claimType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Amount</span>
                <span className="font-medium text-slate-900">{formatINR(Number(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Bank</span>
                <span className="font-medium text-slate-900">····{user.bankLast4}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">Mock submission for the demo. No real claim is filed with EPFO.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl border border-slate-300 font-medium text-slate-700">
                Back
              </button>
              <button type="button" onClick={handleSubmit} className="flex-1 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold">
                Submit claim
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
