# MyEPF

**A simpler, clearer way to check your EPF balance, see if you are ready to claim, track status, and understand what to do next.**

> Independent prototype for **Build What Moves India**.  
> **Not** an official EPFO product or website.

**Live demo:** https://my-epf.vercel.app

## Problem

Millions of Indians struggle with the official EPFO member experience:
- Confusing claim process
- Unclear rejection reasons
- KYC / name mismatch discovered only *after* rejection
- Hard to understand status and next steps

## Solution (citizen journey)

1. **Login** — 3 one-tap demo scenarios
2. **Dashboard** — balance, service history, claim status at a glance
3. **Claim readiness** — KYC, bank, name and open issues checked *before* you submit
4. **Guided claim wizard** — simple 4-step flow
5. **Help** — plain-language explanation, next steps, copyable grievance text
6. **Why better** — side-by-side comparison for reviewers (`/why`)

## Demo accounts

| UAN          | Password | Scenario                    |
|--------------|----------|-----------------------------|
| 100123456789 | demo123  | Clean — ready to claim      |
| 100987654321 | demo123  | Name mismatch / rejected    |
| 100555666777 | demo123  | Claim currently processing  |

## Suggested demo path for judges

1. Open https://my-epf.vercel.app → **Try the demo**
2. Login as `100987654321` → see alert → **Check readiness** → Fail
3. Open **Help** → Explain → copy sample grievance
4. Logout / login as `100123456789` → readiness OK → **Start a claim** (4 steps)
5. Optional: open `/why` for comparison table

## Tech

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Client-side mock data only (no real government systems)
- Deployed on Vercel

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Compliance & limitations

- All data is synthetic
- No real Aadhaar, PAN, OTPs or payments
- Banner on every page: independent hackathon prototype
- Guidance is illustrative; real claims must use official EPFO channels

## Submission notes

- **Public URL:** https://my-epf.vercel.app
- **Repo:** https://github.com/Aryan418-dev/my-epf
- Complete working citizen journey (login → dashboard → readiness → claim → help)
- Mobile-first
- Mock-only architecture as required

---

Built as an independent prototype for Build What Moves India.
