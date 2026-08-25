/** Synthetic citizen + applications + inbox for JANSEVA demo */

export interface DemoProfile {
  name: string;
  label: string;
  state: string;
  education: string;
}

export const DEMO_PROFILE: DemoProfile = {
  name: "Aryan Kumar",
  label: "Demo profile — fictional data",
  state: "Madhya Pradesh",
  education: "B.Tech student",
};

export interface DemoDoc {
  id: string;
  name: string;
  status: "sample";
}

export const DEMO_DOCS: DemoDoc[] = [
  { id: "aadhaar", name: "Aadhaar — SAMPLE", status: "sample" },
  { id: "pan", name: "PAN — SAMPLE", status: "sample" },
  { id: "income", name: "Income Certificate — SAMPLE", status: "sample" },
  { id: "domicile", name: "Domicile — SAMPLE", status: "sample" },
  { id: "bank", name: "Bank Proof — SAMPLE", status: "sample" },
  { id: "education", name: "Education Certificate — SAMPLE", status: "sample" },
];

export type AppStatus = "submitted" | "documents" | "verification" | "processing" | "decision" | "action_required";

export interface DemoApplication {
  id: string;
  serviceId: string;
  title: string;
  progress: number;
  status: AppStatus;
  statusLabel: string;
  nextAction?: string;
  timeline: { label: string; done: boolean; current?: boolean }[];
}

export const DEMO_APPLICATIONS: DemoApplication[] = [
  {
    id: "app-epf-1",
    serviceId: "epf-claim",
    title: "EPF Claim",
    progress: 100,
    status: "processing",
    statusLabel: "Under review",
    nextAction: "Track claim on EPF dashboard",
    timeline: [
      { label: "Submitted", done: true },
      { label: "Documents checked", done: true },
      { label: "Verification", done: true },
      { label: "Processing", done: false, current: true },
      { label: "Decision", done: false },
    ],
  },
  {
    id: "app-inc-1",
    serviceId: "income-certificate",
    title: "Income Certificate",
    progress: 70,
    status: "verification",
    statusLabel: "Verification",
    nextAction: "Wait for tehsil verification (mock)",
    timeline: [
      { label: "Submitted", done: true },
      { label: "Documents checked", done: true },
      { label: "Verification", done: false, current: true },
      { label: "Processing", done: false },
      { label: "Decision", done: false },
    ],
  },
  {
    id: "app-sch-1",
    serviceId: "scholarship",
    title: "Student Scholarship",
    progress: 40,
    status: "action_required",
    statusLabel: "Documents required",
    nextAction: "Upload income certificate (sample)",
    timeline: [
      { label: "Submitted", done: true },
      { label: "Documents checked", done: false, current: true },
      { label: "Verification", done: false },
      { label: "Processing", done: false },
      { label: "Decision", done: false },
    ],
  },
];

export interface InboxItem {
  id: string;
  service: string;
  message: string;
  actionLabel: string;
  href: string;
}

export const DEMO_INBOX: InboxItem[] = [
  {
    id: "n1",
    service: "Scholarship",
    message: "Income certificate is missing.",
    actionLabel: "Fix this",
    href: "/applications/app-sch-1",
  },
  {
    id: "n2",
    service: "EPF",
    message: "Claim submitted and under review.",
    actionLabel: "Track claim",
    href: "/epf",
  },
  {
    id: "n3",
    service: "Income Certificate",
    message: "Application is in verification.",
    actionLabel: "View",
    href: "/applications/app-inc-1",
  },
];
