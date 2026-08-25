# JANSEVA (LogSeva)

**One place to get government work done.**  
*Tell us what you need. We’ll guide you through the journey.*

> Independent prototype for **Build What Moves India**.  
> **Not** an official government service. All data is synthetic or simulated.

**Live:** https://logseva.vercel.app  
**Repo:** https://github.com/Aryan418-dev/my-epf

## Product

Citizens should not need to understand departments and portals before completing a task. JANSEVA is intent-first:

**Intent → Discovery → Eligibility → Documents → Guided application → Status → Next action**

### Working journeys (deep)
1. **EPF claim & status** — readiness score, guided claim, plain-language help
2. **Income certificate** — 5-step guided mock application
3. **Student scholarship** — eligibility + mock submit
4. **Grievance** — structured complaint with synthetic reference

### Platform shell
- Intent search (English / Hindi / Hinglish rules)
- Services catalog (Working vs Coming later)
- My Applications + timeline
- Government Inbox
- Document wallet (SAMPLE only)
- Demo profile
- Mobile nav: Home | Services | Applications | Inbox | Profile

## Demo EPF accounts

| UAN | Password | Scenario |
|-----|----------|----------|
| 100123456789 | demo123 | Clean — ready to claim |
| 100987654321 | demo123 | Name mismatch |
| 100555666777 | demo123 | Claim processing |

## Stack

Next.js 15 · TypeScript · Tailwind · client-side mocks (no live government APIs)

## Local

```bash
npm install
npm run dev
```

## Safety

- No real Aadhaar, PAN, OTP, payments, or government systems
- Banner on every screen
- Mock submissions only
