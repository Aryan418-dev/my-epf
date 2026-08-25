# MyEPF

**A simpler, clearer way to check your EPF balance, see if you are ready to claim, track status, and understand what to do next.**

> Independent hackathon prototype for **Build What Moves India**.  
> This is **not** an official EPFO product or website.

## Problem

Millions of Indians struggle with the official EPFO member portal:
- Confusing claim process
- Unclear rejection reasons
- KYC / name mismatch headaches discovered only after rejection
- Hard to understand status and next steps

## What MyEPF does

1. **Dashboard** — Balance, service history, claim status at a glance
2. **Claim readiness checker** — KYC, bank, name and open issues checked *before* you submit
3. **Guided claim wizard** — Simple 4-step flow
4. **Plain-language help** — Why something is stuck + exact next steps + sample grievance text
5. Mobile-first design for real Indian users

## Mock Login Credentials (for reviewers)

| UAN            | Password   | Scenario                          |
|----------------|------------|-----------------------------------|
| 100123456789   | demo123    | Clean account, ready to claim     |
| 100987654321   | demo123    | Name mismatch / rejected claim    |
| 100555666777   | demo123    | Claim currently processing        |

## Citizen journey (demo path)

1. Open site → Try the demo
2. Quick-login with any of the 3 UANs
3. See balance + issues (if any)
4. Tap **Check readiness**
5. Tap **Start a claim** (guided wizard)
6. Or open **Get help** for plain-language next steps

## Tech

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Client-side mock data only (no real government systems)
- Easy to replace with real backend later

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub → Import on Vercel → Deploy.  
Live public link is what you submit for the hackathon.

---

Built as an independent prototype for the Build What Moves India hackathon.  
All data is synthetic. No real Aadhaar, PAN, OTPs or payments are used.
