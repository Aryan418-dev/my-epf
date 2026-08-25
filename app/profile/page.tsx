import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import { DEMO_PROFILE } from "@/lib/janseva-data";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-lg font-bold text-slate-900">{DEMO_PROFILE.name}</p>
          <p className="text-sm text-amber-800 bg-amber-50 inline-block mt-1 px-2 py-0.5 rounded">
            {DEMO_PROFILE.label}
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">State</dt>
              <dd className="font-medium text-slate-900">{DEMO_PROFILE.state}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Education</dt>
              <dd className="font-medium text-slate-900">{DEMO_PROFILE.education}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-2">
          <Link href="/documents" className="block bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">
            Document wallet
          </Link>
          <Link href="/login" className="block bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">
            Switch demo EPF account
          </Link>
          <Link href="/" className="block bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
