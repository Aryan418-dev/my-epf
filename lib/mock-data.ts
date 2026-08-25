export type ClaimStatus = "none" | "pending" | "approved" | "rejected" | "processing";

export interface ServiceHistory {
  establishment: string;
  from: string;
  to: string;
  memberId: string;
}

export interface Claim {
  id: string;
  type: string;
  amount: number;
  status: ClaimStatus;
  submittedOn: string;
  reason?: string;
  nextAction?: string;
}

export interface User {
  uan: string;
  password: string;
  name: string;
  balance: number;
  kycStatus: "verified" | "pending" | "mismatch";
  bankLast4: string;
  serviceHistory: ServiceHistory[];
  claims: Claim[];
  issues: string[];
}

export const MOCK_USERS: Record<string, User> = {
  "100123456789": {
    uan: "100123456789",
    password: "demo123",
    name: "Rahul Sharma",
    balance: 284650,
    kycStatus: "verified",
    bankLast4: "4521",
    serviceHistory: [
      {
        establishment: "TechNova Solutions Pvt Ltd",
        from: "Mar 2021",
        to: "Present",
        memberId: "MH/BOM/12345/0000123",
      },
      {
        establishment: "BrightSoft India",
        from: "Jun 2018",
        to: "Feb 2021",
        memberId: "MH/PUN/67890/0000456",
      },
    ],
    claims: [],
    issues: [],
  },
  "100987654321": {
    uan: "100987654321",
    password: "demo123",
    name: "Priya Patel",
    balance: 156780,
    kycStatus: "mismatch",
    bankLast4: "8832",
    serviceHistory: [
      {
        establishment: "Horizon Retail Ltd",
        from: "Jan 2020",
        to: "Present",
        memberId: "GJ/AHM/33445/0000789",
      },
    ],
    claims: [
      {
        id: "CLM-2026-88421",
        type: "Final Settlement",
        amount: 156780,
        status: "rejected",
        submittedOn: "12 Aug 2026",
        reason: "Name mismatch between Aadhaar and EPFO records",
        nextAction: "Update name via employer or Aadhaar correction, then re-submit claim",
      },
    ],
    issues: ["Name mismatch with Aadhaar", "KYC not fully verified"],
  },
  "100555666777": {
    uan: "100555666777",
    password: "demo123",
    name: "Amit Kumar",
    balance: 98240,
    kycStatus: "verified",
    bankLast4: "1109",
    serviceHistory: [
      {
        establishment: "LogiTrans Logistics",
        from: "Sep 2019",
        to: "Present",
        memberId: "DL/DEL/99887/0000321",
      },
    ],
    claims: [
      {
        id: "CLM-2026-77102",
        type: "Partial Withdrawal (Medical)",
        amount: 45000,
        status: "processing",
        submittedOn: "18 Aug 2026",
        nextAction: "Usually takes 7–15 working days. Track here for updates.",
      },
    ],
    issues: [],
  },
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}