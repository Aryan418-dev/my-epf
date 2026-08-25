import Link from "next/link";
import { Shield, ArrowRight, Smartphone, HelpCircle, CheckCircle2, ClipboardCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-epf-50 to-white">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        Independent hackathon prototype · Not an official EPFO website
      </div>

      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-epf-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-epf-900 tracking-tight">MyEPF</h1>
            <p className="text-sm text-epf-700">Clearer EPF claims & status</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <section className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
            Check balance.<br />Know if you are ready.<br />Track claims clearly.
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl">
            MyEPF reimagines the most frustrating parts of the EPFO experience —
            so you spend less time guessing and more time getting your money.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-epf-600 hover:bg-epf-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-colors"
          >
            Try the demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <ClipboardCheck className="w-8 h-8 text-epf-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Claim readiness</h3>
            <p className="text-sm text-slate-600">See KYC, bank and name issues before you submit — not after rejection.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <HelpCircle className="w-8 h-8 text-epf-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Plain-language help</h3>
            <p className="text-sm text-slate-600">Clear reasons when something is stuck and exact next steps.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-epf-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Guided claims</h3>
            <p className="text-sm text-slate-600">Simple step-by-step flow instead of confusing multi-page forms.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <Smartphone className="w-8 h-8 text-epf-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Mobile first</h3>
            <p className="text-sm text-slate-600">Designed for phones and slower connections.</p>
          </div>
        </section>

        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-3">Demo accounts (for reviewers)</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-mono bg-white px-2 py-0.5 rounded border">100123456789</span> / demo123 — Clean account (ready to claim)</p>
            <p><span className="font-mono bg-white px-2 py-0.5 rounded border">100987654321</span> / demo123 — Name mismatch / rejected claim</p>
            <p><span className="font-mono bg-white px-2 py-0.5 rounded border">100555666777</span> / demo123 — Claim in progress</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Why this is better</h3>
          <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>Shows problems <em>before</em> you file a claim</li>
            <li>Explains rejections in plain language with next actions</li>
            <li>One clear mobile journey instead of scattered pages</li>
            <li>Mock data only — no real Aadhaar, PAN or government systems</li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Independent prototype for Build What Moves India · Not affiliated with EPFO
      </footer>
    </div>
  );
}