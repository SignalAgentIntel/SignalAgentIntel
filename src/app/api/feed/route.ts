import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const wallet = searchParams.get('wallet')
  if (!wallet) return NextResponse.json({ error: 'wallet required' }, { status: 400 })

  // Mock feed — in prod: pull from DB populated by the agent
  return NextResponse.json({
    events: [
      {
        id: '1', source: 'onchain', severity: 'critical',
        title: 'Whale moved $2.1M out of Uniswap LP',
        summary: 'Address 0x7f2a...d91c removed $2.1M in liquidity from the main ETH/TOKEN pool.',
        aiScore: 94, timestamp: new Date(), read: false,
      },
      {
        id: '2', source: 'twitter', severity: 'high',
        title: 'Core dev hints at major protocol update',
        summary: 'Lead developer posted a cryptic thread suggesting "something big" shipping next week.',
        aiScore: 78, timestamp: new Date(Date.now() - 3600000), read: false,
      },
      {
        id: '3', source: 'github', severity: 'medium',
        title: '14 commits pushed to main branch in 2 hours',
        summary: 'Unusual dev activity detected. Multiple files modified in the core contract directory.',
        aiScore: 62, timestamp: new Date(Date.now() - 7200000), read: true,
      },
    ],
    agentStatus: { running: true, vmId: 'vm_signal_prod', lastScan: new Date() },
  })
}
