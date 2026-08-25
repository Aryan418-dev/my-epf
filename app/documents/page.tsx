import Disclaimer from "@/components/Disclaimer";
import { DEMO_DOCS } from "@/lib/janseva-data";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Disclaimer />
      <div className="max-w-lg mx-auto px-4 pt-6">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Document wallet</h1>
        <p className="text-sm text-slate-600 mb-5">All items are SAMPLE / SYNTHETIC DATA</p>

        <ul className="space-y-2">
          {DEMO_DOCS.map((d) => (
            <li
              key={d.id}
              className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between"
            >
              <span className="text-sm font-medium text-slate-800">{d.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
                Sample
              </span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-slate-400 mt-6 text-center">
          Never enter real Aadhaar, PAN or sensitive IDs in this prototype.
        </p>
      </div>
    </div>
  );
}
