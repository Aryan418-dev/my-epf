"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Shield, Zap } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import { matchIntent } from "@/lib/intent";
import { CATEGORIES, SERVICES } from "@/lib/services";
import { MOCK_USERS } from "@/lib/mock-data";
import type { ServiceDef } from "@/lib/services";

const EXAMPLES = [
  "I want to track my EPF claim",
  "I need an income certificate",
  "I need a scholarship",
  "Mujhe pension ka status check karna hai",
  "I want to file a grievance",
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ServiceDef[] | null>(null);
  const [message, setMessage] = useState("");
  const [sessionName, setSessionName] = useState<string | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const uan = localStorage.getItem("myepf_uan");
    if (uan && MOCK_USERS[uan]) setSessionName(MOCK_USERS[uan].name);
  }, []);

  function runSearch(q: string) {
    const r = matchIntent(q);
    setResults(r.matched);
    setMessage(r.message);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(query);
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />

      <header className="max-w-lg mx-auto px-4 pt-6 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-700 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">JANSEVA</h1>
          <p className="text-xs text-slate-500 truncate">One place to get government work done</p>
        </div>
        {sessionName && (
          <Link href="/dashboard" className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg shrink-0">
            EPF · {sessionName.split(" ")[0]}
          </Link>
        )}
      </header>

      <main className="max-w-lg mx-auto px-4 pt-4 space-y-6">
        <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-indigo-700" />
            <p className="text-sm font-semibold text-indigo-900">Quick start (demo)</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/epf"
              className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 border border-indigo-100 active:bg-slate-50"
            >
              1. EPF journey (readiness + claim) →
            </Link>
            <Link
              href="/services/income-certificate"
              className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 border border-indigo-100 active:bg-slate-50"
            >
              2. Income certificate →
            </Link>
            <Link
              href="/applications"
              className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-900 border border-indigo-100 active:bg-slate-50"
            >
              3. Track applications & inbox →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-2">
            What do you want to get done?
          </h2>
          <p className="text-slate-600 text-sm mb-4">
            Tell us what you need. We’ll guide you through the journey.
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                aria-hidden
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tell us what you need…"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none shadow-sm"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white font-semibold py-3.5 rounded-xl"
            >
              Find services
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setQuery(ex);
                  runSearch(ex);
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 active:bg-slate-50"
              >
                {ex}
              </button>
            ))}
          </div>
        </section>

        {results && (
          <section ref={resultsRef} className="space-y-3 scroll-mt-4">
            <p className="text-sm text-slate-600">{message}</p>
            {results.length === 0 ? (
              <p className="text-sm text-slate-500">No working prototype matched. Try EPF or Certificates.</p>
            ) : (
              results.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 active:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{s.name}</p>
                      <p className="text-sm text-slate-600 mt-0.5">{s.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  </div>
                  <span className="inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                    Working prototype
                  </span>
                </Link>
              ))
            )}
          </section>
        )}

        <section>
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Browse by category</h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => {
              const count = SERVICES.filter((s) => s.category === c.id && s.status === "working").length;
              return (
                <Link
                  key={c.id}
                  href={`/services?cat=${c.id}`}
                  className="bg-white rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-800 hover:border-indigo-300 active:bg-slate-50"
                >
                  <span className="block leading-snug">{c.name}</span>
                  <span className="block text-xs text-slate-500 font-normal mt-0.5">
                    {count > 0 ? `${count} available` : "Coming later"}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900 mb-1">How it works</p>
          <p className="text-sm text-slate-600">
            Discover → Understand → Apply → Track → Resolve. You don’t need to know which department owns the form.
          </p>
        </section>
      </main>
    </div>
  );
}
