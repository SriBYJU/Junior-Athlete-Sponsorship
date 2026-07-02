# 🏅 SponsorSpark

**An AI copilot that helps families of junior athletes land brand sponsorships.**

Brands increasingly sponsor junior athletes in fast-growing niche sports (pickleball, esports, golf,
gymnastics, wrestling) because they're authentic, affordable, and build loyalty early. Most families don't
know it's possible — let alone how to build a media kit, find the right brands, or write a pitch.
SponsorSpark does the hard parts.

This repo is the **MVP of the single-player tool**, deliberately architected so it can grow into a
brand ↔ athlete **marketplace** (the long-term business).

---

## What's inside

Three AI tools, all reachable from `/copilot`:

| Tool | Endpoint | What it does |
| --- | --- | --- |
| 📄 Media Kit Builder | `POST /api/media-kit` | Turns a profile into a polished one-page sponsorship kit |
| 🎯 Brand Matcher | `POST /api/brand-match` | Suggests sport-aware brand categories + the angle that works |
| ✉️ Pitch Writer | `POST /api/pitch` | Drafts a warm, specific outreach email with clear deliverables |

**Minor-safe by design:** a parent/guardian consent gate, data minimization (first name only, no address or
school), and clear disclaimers throughout. See `/privacy` and `/terms`.

## Tech

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Provider-agnostic AI wrapper (`lib/ai.ts`) that calls OpenAI when configured
- **Demo mode:** with no API key, the app returns high-quality templated output labeled `demo mode`, so it
  runs and demos perfectly offline

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: add OPENAI_API_KEY for live AI output
npm run dev                  # http://localhost:3000
```

Without a key, everything works in demo mode. Add `OPENAI_API_KEY` to `.env.local` for tailored output.

### Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Project structure

```
app/
  page.tsx            # marketing landing page
  copilot/page.tsx    # the interactive copilot (consent gate + form + results)
  privacy/page.tsx    # COPPA-conscious Privacy Policy (draft)
  terms/page.tsx      # Terms of Service (draft)
  api/
    media-kit/route.ts
    brand-match/route.ts
    pitch/route.ts
lib/
  ai.ts               # OpenAI wrapper + demo fallback
  generators.ts       # prompts + demo templates for each tool
  brands.ts           # curated sport → brand knowledge base
  validate.ts         # request-body validation at the boundary
  types.ts
components/
  Markdown.tsx        # tiny dependency-free Markdown renderer
```

## Roadmap → from tool to marketplace

1. **Auth + saved athletes** (parent accounts) — aggregate the supply side.
2. **Billing** (freemium → paid) — unlock unlimited generations + saved athletes.
3. **Deal tracker** — manage deliverables and deadlines after a deal closes.
4. **Brand portal + AI matching** — flip on the two-sided marketplace and take a cut of deals.

## ⚠️ Legal note

SponsorSpark handles **minors' data and commercial arrangements**. The Privacy Policy and Terms in this repo
are **drafts written to be a strong starting point — not a substitute for a licensed attorney.** Have them
reviewed, complete the bracketed placeholders, and confirm your obligations (COPPA and state privacy laws,
contracts involving minors, FTC endorsement/disclosure rules, and NIL/eligibility rules for scholastic
athletes) before launch.
