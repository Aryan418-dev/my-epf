import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { DEMO_APPLICATIONS } from "@/lib/janseva-data";

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-slate-900 mb-1">My Applications</h1>
        <p className="text-sm text-slate-600 mb-5">Unified tracker · synthetic demo data</p>

        {DEMO_APPLICATIONS.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <p className="text-slate-700 font-medium">You haven’t started an application yet.</p>
            <Link href="/" className="inline-block mt-3 text-indigo-700 font-medium text-sm">
              Tell us what you need →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {DEMO_APPLICATIONS.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/applications/${app.id}`}
                  className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-slate-900">{app.title}</p>
                    <span className="text-xs text-slate-500">{app.progress}%</span>
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
      </div>
    </div>
  );
}
