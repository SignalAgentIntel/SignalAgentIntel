import { NextRequest, NextResponse } from 'next/server'

export const PRICE_PER_PROJECT = 0.05 // USDC/month

export async function requirePayment(req: NextRequest, amount: number) {
  const header = req.headers.get('x-payment')
  if (!header) return { paid: false }
  try {
    const p = JSON.parse(Buffer.from(header, 'base64').toString())
    return { paid: true, txHash: p.txHash }
  } catch {
    return { paid: false }
  }
}

export const paymentRequired = (amount: number) =>
  NextResponse.json(
    { error: 'Payment Required', amount, currency: 'USDC', network: 'base', protocol: 'x402' },
    { status: 402, headers: { 'x-payment-amount': String(amount), 'x-payment-currency': 'USDC' } }
  )
