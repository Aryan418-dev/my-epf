"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { DEMO_APPLICATIONS } from "@/lib/janseva-data";

export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const app = DEMO_APPLICATIONS.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <p className="text-slate-600">Application not found.</p>
        <Link href="/applications" className="text-indigo-700 text-sm font-medium mt-2 inline-block">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/applications" className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="font-semibold text-slate-900">{app.title}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Status</p>
          <p className="font-semibold text-slate-900 text-lg">{app.statusLabel}</p>
          <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${app.progress}%` }} />
          </div>
          {app.nextAction && (
            <p className="text-sm text-slate-700 mt-3">
              <span className="font-medium">What you should do:</span> {app.nextAction}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-900 text-sm mb-4">Timeline</p>
          <ol className="space-y-4">
            {app.timeline.map((step, i) => (
              <li key={i} className="flex gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    step.done ? "bg-green-500" : step.current ? "bg-indigo-600 ring-4 ring-indigo-100" : "bg-slate-200"
                  }`}
                />
                <div>
                  <p className={`text-sm font-medium ${step.current ? "text-indigo-800" : "text-slate-800"}`}>
                    {step.label}
                    {step.current ? " (current)" : ""}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {app.serviceId === "epf-claim" && (
          <Link href="/epf" className="block text-center bg-indigo-700 text-white font-semibold py-3 rounded-xl">
            Open EPF journey
          </Link>
        )}
      </main>
    </div>
  );
}
