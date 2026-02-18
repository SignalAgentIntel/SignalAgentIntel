export type Chain = 'base' | 'ethereum' | 'arbitrum' | 'solana'
export type Source = 'twitter' | 'onchain' | 'github' | 'discord' | 'news'
export type Severity = 'info' | 'medium' | 'high' | 'critical'

export interface Project {
  id: string
  name: string
  symbol: string
  address?: string
  chain?: Chain
  twitter?: string
  github?: string
  discord?: string
  addedAt: Date
}

export interface SignalEvent {
  id: string
  projectId: string
  source: Source
  severity: Severity
  title: string
  summary: string
  url?: string
  txHash?: string
  timestamp: Date
  read: boolean
  aiScore: number // 0-100 relevance score
}

export interface Subscription {
  id: string
  walletAddress: string
  projects: Project[]
  paidUntil: Date
  txHash: string
  createdAt: Date
}

export interface AgentStatus {
  running: boolean
  vmId: string
  uptime: number
  lastScan: Date
  eventsProcessed: number
  conwayBalance: number
}
