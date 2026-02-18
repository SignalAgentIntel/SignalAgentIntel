/**
 * signal/lib/conway.ts
 *
 * All infra for Signal runs through Conway.
 * VMs, domains, compute — the agent handles all of it.
 * https://conway.tech · https://docs.conway.tech
 */

const API = 'https://api.conway.tech'
const KEY = process.env.CONWAY_API_KEY!

const request = async (path: string, body?: object) => {
  const res = await fetch(`${API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    ...(body && { body: JSON.stringify(body) }),
  })
  return res.json()
}

export const conway = {
  cloud: {
    spawn: (name: string) => request('/cloud/sandboxes', { name, size: 'small', region: 'us-east-1' }),
    exec:  (vmId: string, cmd: string) => request(`/cloud/sandboxes/${vmId}/exec`, { command: cmd }),
    list:  () => request('/cloud/sandboxes'),
  },
  domains: {
    register: (domain: string) => request('/domains/register', { domain }),
    dns:      (domain: string, record: object) => request('/domains/dns', { domain, record }),
  },
  compute: {
    infer: (prompt: string, model = 'claude-sonnet-4-6') =>
      request('/compute/inference', { prompt, model, max_tokens: 512 }),
  },
}
