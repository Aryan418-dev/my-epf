import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Shield } from "lucide-react";

export default function WhyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        Independent hackathon prototype · Not an official EPFO website
      </div>

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="font-semibold text-slate-900">Why MyEPF is better</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-epf-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900">MyEPF vs typical EPFO experience</p>
            <p className="text-sm text-slate-500">Built for real Indian citizens on mobile</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 border-b border-slate-100 text-xs font-medium text-slate-500">
            <div className="px-4 py-2 bg-red-50 text-red-700">Common today</div>
            <div className="px-4 py-2 bg-green-50 text-green-700">With MyEPF</div>
          </div>
          {[
            {
              bad: "Discover name/KYC mismatch only after claim is rejected",
              good: "Readiness check shows problems before you submit",
            },
            {
              bad: "Rejection reasons are technical and hard to act on",
              good: "Plain language + exact next step + sample grievance text",
            },
            {
              bad: "Multi-page forms, unclear progress, desktop-first",
              good: "Guided 4-step claim wizard, mobile-first",
            },
            {
              bad: "Status is a black box",
              good: "Clear status, expected timelines, what to do next",
            },
            {
              bad: "Users bounce between portals and helplines",
              good: "One continuous citizen journey from login to claim",
            },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-b border-slate-100 last:border-0 text-sm">
              <div className="px-4 py-3 text-slate-600 flex gap-2">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{row.bad}</span>
              </div>
              <div className="px-4 py-3 text-slate-800 flex gap-2 bg-green-50/40">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{row.good}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <p className="font-semibold text-slate-900 text-sm">What is mocked</p>
          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Login, balance, claims, and status (synthetic data only)</li>
            <li>No real Aadhaar, PAN, OTP, or payment systems</li>
            <li>No connection to live EPFO infrastructure</li>
          </ul>
          <p className="font-semibold text-slate-900 text-sm pt-2">How it could scale</p>
          <p className="text-sm text-slate-600">
            Same journey can sit on top of official APIs once available, with strong auth,
            audit logs, and regional language support — without changing the citizen experience.
          </p>
        </div>

        <Link
          href="/login"
          className="block w-full text-center bg-epf-600 hover:bg-epf-700 text-white font-semibold py-3.5 rounded-xl"
        >
          Try the full demo
        </Link>
      </main>
    </div>
  );
}