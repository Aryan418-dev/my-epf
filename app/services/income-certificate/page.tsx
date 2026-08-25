"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { addApplication, addInboxItem, createSubmittedApp } from "@/lib/app-store";

type Step = 1 | 2 | 3 | 4 | 5;

export default function IncomeCertificatePage() {
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState("Madhya Pradesh");
  const [income, setIncome] = useState("");
  const [purpose, setPurpose] = useState("");
  const [ref, setRef] = useState("");

  function submit() {
    const r = "INC-MOCK-" + Date.now().toString().slice(-6);
    setRef(r);
    const app = createSubmittedApp({
      serviceId: "income-certificate",
      title: "Income Certificate",
      ref: r,
    });
    app.progress = 70;
    app.status = "verification";
    app.statusLabel = "Verification";
    app.nextAction = "Wait for tehsil verification (mock)";
    app.timeline = [
      { label: "Submitted", done: true },
      { label: "Documents checked", done: true },
      { label: "Verification", done: false, current: true },
      { label: "Processing", done: false },
      { label: "Decision", done: false },
    ];
    addApplication(app);
    addInboxItem({
      id: "inbox-" + r,
      service: "Income Certificate",
      message: `Application ${r} is in verification.`,
      actionLabel: "View",
      href: `/applications/${r}`,
    });
    setStep(5);
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
            <h1 className="font-semibold text-slate-900">Income Certificate</h1>
            <p className="text-xs text-slate-500">Step {step} of 5 · Working prototype</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-indigo-600" : "bg-slate-200"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What is this for?</h2>
            <p className="text-sm text-slate-600">
              An income certificate shows your family’s yearly income. Many scholarships and schemes ask for it.
            </p>
            <div className="bg-slate-50 rounded-xl p-3 flex gap-2 text-sm text-slate-700">
              <HelpCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Explain:</strong> Enter total family income from all sources for the last financial year — not only your salary.
              </span>
            </div>
            <button type="button" onClick={() => setStep(2)} className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-xl">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Eligibility (demo)</h2>
            <label className="block text-sm font-medium text-slate-700">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white">
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
              <option>Other (demo)</option>
            </select>
            <label className="block text-sm font-medium text-slate-700">Purpose</label>
            <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white">
              <option value="">Select…</option>
              <option value="scholarship">Scholarship</option>
              <option value="scheme">Welfare scheme</option>
              <option value="other">Other</option>
            </select>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-slate-300 py-3 rounded-xl font-medium">Back</button>
              <button type="button" disabled={!purpose} onClick={() => setStep(3)} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Documents & income</h2>
            <p className="text-sm text-slate-600">Checklist (sample — do not upload real IDs):</p>
            <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
              <li>Aadhaar — SAMPLE</li>
              <li>Address proof — SAMPLE</li>
              <li>Income proof — SAMPLE</li>
            </ul>
            <label className="block text-sm font-medium text-slate-700">Annual family income (₹)</label>
            <input type="number" inputMode="numeric" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 250000" className="w-full px-4 py-3 rounded-xl border border-slate-300" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-slate-300 py-3 rounded-xl font-medium">Back</button>
              <button type="button" disabled={!income || Number(income) <= 0} onClick={() => setStep(4)} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50">Continue</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Review</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-sm space-y-2">
              <p><span className="text-slate-500">State:</span> {state}</p>
              <p><span className="text-slate-500">Purpose:</span> {purpose}</p>
              <p><span className="text-slate-500">Family income:</span> ₹{Number(income).toLocaleString("en-IN")}</p>
            </div>
            <p className="text-xs text-slate-500">Mock only. Saves to Applications on this device.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(3)} className="flex-1 border border-slate-300 py-3 rounded-xl font-medium">Back</button>
              <button type="button" onClick={submit} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl">Submit (mock)</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application submitted</h2>
            <p className="font-mono text-indigo-700 font-semibold">{ref}</p>
            <Link href={`/applications/${ref}`} className="inline-block bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl">
              View application
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
