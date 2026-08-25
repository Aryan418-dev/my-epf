"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";

type Step = 1 | 2 | 3 | 4;

export default function ScholarshipPage() {
  const [step, setStep] = useState<Step>(1);
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [ref, setRef] = useState("");

  function submit() {
    setRef("SCH-MOCK-" + Date.now().toString().slice(-6));
    setStep(4);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/services" className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="font-semibold text-slate-900">Student Scholarship</h1>
            <p className="text-xs text-slate-500">Step {step} of 4 · Working prototype</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-indigo-600" : "bg-slate-200"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Education level</h2>
            <p className="text-sm text-slate-600">Demo eligibility only — not a real scheme.</p>
            {["Class 11–12", "Undergraduate", "Postgraduate"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLevel(l);
                  setStep(2);
                }}
                className="w-full text-left bg-white border border-slate-200 rounded-xl px-4 py-3.5 font-medium"
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Year of study</h2>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2nd year"
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
            <p className="text-sm text-slate-600">Required documents (sample): income certificate, marksheet, ID proof.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-slate-300 py-3 rounded-xl">
                Back
              </button>
              <button
                type="button"
                disabled={!year.trim()}
                onClick={() => setStep(3)}
                className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Review</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm space-y-2">
              <p><span className="text-slate-500">Level:</span> {level}</p>
              <p><span className="text-slate-500">Year:</span> {year}</p>
              <p><span className="text-slate-500">State:</span> Madhya Pradesh (demo profile)</p>
            </div>
            <p className="text-xs text-slate-500">Mock only. Inbox may show “income certificate missing” for this demo scenario.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-slate-300 py-3 rounded-xl">
                Back
              </button>
              <button type="button" onClick={submit} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl">
                Submit (mock)
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application recorded</h2>
            <p className="font-mono text-indigo-700 font-semibold">{ref}</p>
            <Link href="/inbox" className="inline-block bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl">
              Check inbox
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
