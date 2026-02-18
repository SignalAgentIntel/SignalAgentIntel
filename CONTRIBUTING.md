# Contributing to Signal

Thanks for your interest. Signal is an autonomous agent project — contributions that push the autonomy further are especially welcome.

---

## what we're looking for

- **New data sources** — additional on-chain indexers, social feeds, news aggregators
- **Better AI scoring** — improved prompts or models for Conway Compute inference
- **Alert delivery** — Telegram, Discord, email integrations
- **Conway optimizations** — smarter VM usage, cost reductions
- **Bug fixes** — especially around x402 payment flows

## getting started

```bash
git clone https://github.com/yourusername/signal.git
cd signal
npm install
cp .env.example .env.local
npm run dev
```

## pull request checklist

- [ ] TypeScript — no `any` unless absolutely necessary
- [ ] New env vars added to `.env.example`
- [ ] Conway usage documented in comments
- [ ] x402 payment flows tested locally

## style

- Functional over classes where possible
- Conway calls go in `src/lib/conway.ts` only
- Keep API routes thin — logic belongs in `lib/`

---

Questions? Open an issue or find us on Twitter.
