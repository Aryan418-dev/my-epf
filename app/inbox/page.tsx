import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { DEMO_INBOX } from "@/lib/janseva-data";

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Government Inbox</h1>
        <p className="text-sm text-slate-600 mb-5">Notifications that lead to a real next step</p>

        {DEMO_INBOX.length === 0 ? (
          <p className="text-slate-600 text-sm">You’re all caught up.</p>
        ) : (
          <ul className="space-y-3">
            {DEMO_INBOX.map((n) => (
              <li key={n.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <p className="text-xs font-medium text-indigo-700 uppercase tracking-wide">{n.service}</p>
                <p className="text-slate-900 font-medium mt-1">{n.message}</p>
                <Link href={n.href} className="inline-block mt-3 text-sm font-semibold text-indigo-700">
                  {n.actionLabel} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
