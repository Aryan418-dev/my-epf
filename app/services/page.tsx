"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Disclaimer from "@/components/Disclaimer";
import { SERVICES, CATEGORIES, type ServiceCategory } from "@/lib/services";

function ServicesList() {
  const params = useSearchParams();
  const cat = params.get("cat") as ServiceCategory | null;
  const list = cat ? SERVICES.filter((s) => s.category === cat) : SERVICES;
  const catName = cat ? CATEGORIES.find((c) => c.id === cat)?.name : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Services</h1>
        <p className="text-sm text-slate-600 mb-4">
          {catName ? catName : "All categories"} · Working prototypes marked clearly
        </p>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-3 -mx-4 px-4 scrollbar-none">
          <Link
            href="/services"
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap ${
              !cat ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/services?cat=${c.id}`}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap ${
                cat === c.id ? "bg-indigo-700 text-white border-indigo-700" : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <ul className="space-y-3">
          {list.map((s) => (
            <li key={s.id}>
              {s.status === "coming" ? (
                <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-700">{s.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{s.description}</p>
                  <span className="inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    Coming later
                  </span>
                </div>
              ) : (
                <Link
                  href={s.href}
                  className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 active:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{s.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                      Working prototype
                    </span>
                    <span className="text-[11px] text-slate-500">{s.processingTime}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 pb-24">Loading…</div>}>
      <ServicesList />
    </Suspense>
  );
}
