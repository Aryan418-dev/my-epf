"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { getAllApplications } from "@/lib/app-store";
import type { DemoApplication } from "@/lib/janseva-data";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<DemoApplication[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setApps(getAllApplications());
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-slate-900 mb-1">My Applications</h1>
        <p className="text-sm text-slate-600 mb-5">Unified tracker · updates when you submit</p>

        {!ready ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : apps.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-slate-700 font-medium">You haven’t started an application yet.</p>
            <Link href="/" className="inline-block mt-3 text-indigo-700 font-medium text-sm">
              Tell us what you need →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {apps.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/applications/${app.id}`}
                  className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 active:bg-slate-50"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-slate-900">{app.title}</p>
                    <span className="text-xs text-slate-500 shrink-0">{app.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        app.status === "action_required" ? "bg-amber-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${app.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{app.statusLabel}</p>
                  {app.nextAction && (
                    <p className="text-xs text-indigo-700 mt-1">Next: {app.nextAction}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-medium text-indigo-700 py-2"
        >
          + Start a new application
        </Link>
      </div>
    </div>
  );
}
