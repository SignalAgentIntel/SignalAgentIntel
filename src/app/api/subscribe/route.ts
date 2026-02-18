import { NextRequest, NextResponse } from 'next/server'
import { requirePayment, paymentRequired, PRICE_PER_PROJECT } from '@/lib/x402'

export async function POST(req: NextRequest) {
  const { paid } = await requirePayment(req, PRICE_PER_PROJECT)
  if (!paid) return paymentRequired(PRICE_PER_PROJECT)

  const { walletAddress, projects } = await req.json()
  const amount = projects.length * PRICE_PER_PROJECT

  return NextResponse.json({
    success: true,
    subscription: {
      walletAddress,
      projects,
      paidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      amount,
    },
    agent: { status: 'spawning', conwayVm: 'vm_signal_prod' },
  })
}
