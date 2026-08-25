/** Client-side application + inbox store (localStorage) for workable demo */

import type { DemoApplication, InboxItem } from "./janseva-data";
import { DEMO_APPLICATIONS, DEMO_INBOX } from "./janseva-data";

const APPS_KEY = "janseva_apps";
const INBOX_KEY = "janseva_inbox";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getUserApplications(): DemoApplication[] {
  if (typeof window === "undefined") return [];
  return safeParse<DemoApplication[]>(localStorage.getItem(APPS_KEY), []);
}

export function getAllApplications(): DemoApplication[] {
  const user = getUserApplications();
  // User apps first, then seed demos not overwritten by same id
  const ids = new Set(user.map((a) => a.id));
  return [...user, ...DEMO_APPLICATIONS.filter((a) => !ids.has(a.id))];
}

export function addApplication(app: DemoApplication) {
  if (typeof window === "undefined") return;
  const list = getUserApplications().filter((a) => a.id !== app.id);
  list.unshift(app);
  localStorage.setItem(APPS_KEY, JSON.stringify(list));
}

export function getUserInbox(): InboxItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<InboxItem[]>(localStorage.getItem(INBOX_KEY), []);
}

export function getAllInbox(): InboxItem[] {
  const user = getUserInbox();
  const ids = new Set(user.map((n) => n.id));
  return [...user, ...DEMO_INBOX.filter((n) => !ids.has(n.id))];
}

export function addInboxItem(item: InboxItem) {
  if (typeof window === "undefined") return;
  const list = getUserInbox().filter((n) => n.id !== item.id);
  list.unshift(item);
  localStorage.setItem(INBOX_KEY, JSON.stringify(list));
}

export function createSubmittedApp(opts: {
  serviceId: string;
  title: string;
  ref: string;
}): DemoApplication {
  return {
    id: opts.ref,
    serviceId: opts.serviceId,
    title: opts.title,
    progress: 30,
    status: "submitted",
    statusLabel: "Submitted",
    nextAction: "Track progress here",
    timeline: [
      { label: "Submitted", done: true, current: true },
      { label: "Documents checked", done: false },
      { label: "Verification", done: false },
      { label: "Processing", done: false },
      { label: "Decision", done: false },
    ],
  };
}
