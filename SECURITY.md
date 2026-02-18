# Security

## Reporting a vulnerability

If you find a security issue — especially around x402 payment verification, Conway API key handling, or wallet key storage — **do not open a public issue**.

Email us directly or DM on Twitter. We take security seriously given this project handles USDC payments and agent wallets.

## Scope

Things we care most about:

- **Payment bypass** — any way to receive service without valid x402 USDC payment
- **Conway API key exposure** — leaking `CONWAY_API_KEY` in logs, responses, or client bundles
- **Agent wallet compromise** — anything affecting `~/.conway/wallet.json`
- **Injection via project inputs** — malicious token addresses or project names affecting agent behavior

## Out of scope

- Rate limiting / DoS
- UI-only bugs with no security impact

## Response time

We aim to respond within 48 hours and patch within 7 days for critical issues.
