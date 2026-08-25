# MyEPF

**A simpler, clearer way to check your EPF balance, track claims, and understand what to do next.**

> Independent hackathon prototype for **Build What Moves India**.  
> This is **not** an official EPFO product or website.

## Problem

Millions of Indians struggle with the official EPFO member portal:
- Confusing claim process
- Unclear rejection reasons
- KYC / name mismatch headaches
- Hard to understand status and next steps

## What MyEPF does

- Clean mobile-first dashboard (balance + history + claim status)
- Guided claim wizard
- Clear explanations of common problems
- "What should I do next?" guidance
- Mock data only – no real Aadhaar, PAN, or government systems

## Mock Login Credentials (for reviewers)

| UAN            | Password   | Scenario                    |
|----------------|------------|-----------------------------|
| 100123456789   | demo123    | Clean account, ready claim  |
| 100987654321   | demo123    | KYC mismatch / stuck claim  |
| 100555666777   | demo123    | Pending claim in progress   |

## Tech

- Next.js 15 (App Router)
- TypeScript + Tailwind CSS
- Client-side mock data (easy to replace with real backend later)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub → Import on Vercel → Deploy.

---

Built as an independent prototype for the Build What Moves India hackathon.