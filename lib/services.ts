export type ServiceStatus = "working" | "simulated" | "coming";

export type ServiceCategory =
  | "pension"
  | "certificates"
  | "education"
  | "grievances"
  | "travel"
  | "taxes"
  | "payments";

export interface ServiceDef {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  status: ServiceStatus;
  processingTime: string;
  fee: string;
  keywords: string[];
  keywordsHi: string[];
  href: string;
}

export const CATEGORIES: { id: ServiceCategory; name: string; icon: string }[] = [
  { id: "pension", name: "Pension & Benefits", icon: "Wallet" },
  { id: "certificates", name: "Certificates", icon: "FileText" },
  { id: "education", name: "Education", icon: "GraduationCap" },
  { id: "grievances", name: "Grievances", icon: "MessageSquare" },
  { id: "travel", name: "Travel & Transport", icon: "Car" },
  { id: "taxes", name: "Taxes & Money", icon: "Receipt" },
  { id: "payments", name: "Payments", icon: "CreditCard" },
];

export const SERVICES: ServiceDef[] = [
  {
    id: "epf-claim",
    name: "EPF Claim & Status",
    category: "pension",
    description: "Check balance, claim readiness, file a claim, and track status in plain language.",
    status: "working",
    processingTime: "7–15 working days",
    fee: "Free",
    keywords: ["epf", "pf", "provident fund", "withdraw", "claim", "pension", "balance", "uan"],
    keywordsHi: ["ईपीएफ", "पीएफ", "पेंशन", "निकासी", "क्लेम", "बैलेंस"],
    href: "/epf",
  },
  {
    id: "income-certificate",
    name: "Income Certificate",
    category: "certificates",
    description: "Apply for a state income certificate needed for scholarships and benefits.",
    status: "working",
    processingTime: "7–21 working days",
    fee: "State fee (mock)",
    keywords: ["income certificate", "income", "salary certificate", "family income"],
    keywordsHi: ["आय प्रमाण पत्र", "इनकम सर्टिफिकेट", "आय प्रमाणपत्र"],
    href: "/services/income-certificate",
  },
  {
    id: "scholarship",
    name: "Student Scholarship",
    category: "education",
    description: "Find and apply for a demo scholarship using synthetic eligibility checks.",
    status: "working",
    processingTime: "15–30 working days",
    fee: "Free",
    keywords: ["scholarship", "college", "student", "financial help", "education aid"],
    keywordsHi: ["छात्रवृत्ति", "स्कॉलरशिप", "कॉलेज", "पढ़ाई"],
    href: "/services/scholarship",
  },
  {
    id: "grievance",
    name: "File a Grievance",
    category: "grievances",
    description: "Report a problem with a service and track a mock grievance reference.",
    status: "working",
    processingTime: "Varies",
    fee: "Free",
    keywords: ["grievance", "complaint", "problem", "not received", "delay", "issue"],
    keywordsHi: ["शिकायत", "समस्या", "गलती", "देरी"],
    href: "/grievances",
  },
  {
    id: "driving-licence",
    name: "Driving Licence Renewal",
    category: "travel",
    description: "Renewal journey coming later in the prototype.",
    status: "coming",
    processingTime: "—",
    fee: "—",
    keywords: ["driving licence", "dl", "renew licence", "license"],
    keywordsHi: ["ड्राइविंग लाइसेंस", "लाइसेंस"],
    href: "/services",
  },
  {
    id: "tax-status",
    name: "Income Tax Status",
    category: "taxes",
    description: "Tax status and refund tracking coming later.",
    status: "coming",
    processingTime: "—",
    fee: "—",
    keywords: ["tax", "itr", "refund", "income tax"],
    keywordsHi: ["टैक्स", "आयकर", "रिफंड"],
    href: "/services",
  },
];

export function getService(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function servicesByCategory(cat: ServiceCategory) {
  return SERVICES.filter((s) => s.category === cat);
}
