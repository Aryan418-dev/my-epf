"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, FileStack, Inbox, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Grid3X3 },
  { href: "/applications", label: "Applications", icon: FileStack },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on pure marketing landing if needed — show on all for demo simplicity
  const hide =
    pathname?.startsWith("/login") ||
    pathname === "/why";

  if (hide) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 safe-pb">
      <div className="max-w-lg mx-auto flex items-stretch justify-between px-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                active ? "text-indigo-700" : "text-slate-500"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-indigo-700" : "text-slate-400"}`} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
