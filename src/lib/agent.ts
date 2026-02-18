/**
 * signal/lib/agent.ts
 *
 * The Signal agent runs on a Conway Cloud VM.
 * It scans sources, scores relevance with AI,
 * and delivers only what matters.
 */

import { conway } from './conway'
import type { Project, SignalEvent, Source } from '@/types'

export class SignalAgent {
  private vmId: string | null = null

  async boot() {
    const vm = await conway.cloud.spawn('signal-agent')
    this.vmId = vm.id
    console.log(`[signal] agent live · conway vm: ${vm.id}`)
    return vm
  }

  /** Pull raw events from all sources for a project */
  async scan(project: Project): Promise<SignalEvent[]> {
    const events: SignalEvent[] = []

    const sources: Source[] = ['twitter', 'onchain', 'github', 'news']

    for (const source of sources) {
      const raw = await this.fetchSource(source, project)
      if (!raw.length) continue

      // Score each event with Conway Compute AI
      for (const item of raw) {
        const score = await this.scoreRelevance(item, project)
        if (score < 40) continue // filter noise

        events.push({
          id: crypto.randomUUID(),
          projectId: project.id,
          source,
          severity: score > 80 ? 'critical' : score > 60 ? 'high' : score > 40 ? 'medium' : 'info',
          title: item.title,
          summary: item.summary,
          url: item.url,
          txHash: item.txHash,
          timestamp: new Date(),
          read: false,
          aiScore: score,
        })
      }
    }

    return events.sort((a, b) => b.aiScore - a.aiScore)
  }

  /** Use Conway Compute to score how relevant/important an event is */
  private async scoreRelevance(item: { title: string; summary: string }, project: { name: string; symbol: string }): Promise<number> {
    const prompt = `
      Rate the importance of this crypto event for ${project.name} (${project.symbol}) on a scale of 0-100.
      Only return the number.

      Event: "${item.title}"
      "${item.summary}"
    `
    const result = await conway.compute.infer(prompt)
    return Math.min(100, Math.max(0, parseInt(result.text?.trim()) || 0))
  }

  private async fetchSource(source: Source, project: Project): Promise<any[]> {
    // In production: Twitter API, on-chain indexer, GitHub API, news aggregator
    return []
  }
}

export const agent = new SignalAgent()
