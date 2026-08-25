"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { addApplication, addInboxItem, createSubmittedApp } from "@/lib/app-store";

type Step = 1 | 2 | 3 | 4;

export default function GrievancePage() {
  const [step, setStep] = useState<Step>(1);
  const [what, setWhat] = useState("");
  const [when, setWhen] = useState("");
  const [service, setService] = useState("");
  const [outcome, setOutcome] = useState("");
  const [ref, setRef] = useState("");

  function submit() {
    const r = "GRV-MOCK-" + Date.now().toString().slice(-6);
    setRef(r);
    const app = createSubmittedApp({
      serviceId: "grievance",
      title: `Grievance · ${service || "General"}`,
      ref: r,
    });
    app.progress = 60;
    app.status = "processing";
    app.statusLabel = "Response pending";
    app.nextAction = "Await department response (simulated)";
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
      service: "Grievance",
      message: `Grievance ${r} recorded.`,
      actionLabel: "View",
      href: `/applications/${r}`,
    });
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
            <h1 className="font-semibold text-slate-900">File a Grievance</h1>
            <p className="text-xs text-slate-500">Step {step} of 4 · Mock only</p>
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
            <h2 className="text-xl font-bold text-slate-900">What happened?</h2>
            <textarea value={what} onChange={(e) => setWhat(e.target.value)} rows={4} placeholder="e.g. My pension payment has not arrived" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base" />
            <button type="button" disabled={what.trim().length < 10} onClick={() => setStep(2)} className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">When did it start?</h2>
            <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="e.g. Last 2 months" className="w-full px-4 py-3 rounded-xl border border-slate-300" />
            <label className="block text-sm font-medium text-slate-700">Which service?</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white">
              <option value="">Select…</option>
              <option value="EPF / Pension">EPF / Pension</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Certificate">Certificate</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-slate-300 py-3 rounded-xl">Back</button>
              <button type="button" disabled={!when.trim() || !service} onClick={() => setStep(3)} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What outcome do you want?</h2>
            <textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} rows={3} placeholder="e.g. Payment released and confirmation" className="w-full px-4 py-3 rounded-xl border border-slate-300" />
            <div className="bg-white rounded-xl border border-slate-200 p-3 text-sm text-slate-600">
              <p className="font-medium text-slate-800 mb-1">Summary</p>
              <p>{what}</p>
              <p className="mt-1">Service: {service} · Since: {when}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-slate-300 py-3 rounded-xl">Back</button>
              <button type="button" disabled={outcome.trim().length < 5} onClick={submit} className="flex-1 bg-indigo-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50">Submit grievance (mock)</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Grievance recorded</h2>
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
