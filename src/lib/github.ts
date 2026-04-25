const GITHUB_USER = 'Harshil-Desai'
const GITHUB_API = 'https://api.github.com'

function headers() {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (process.env.GITHUB_TOKEN) {
    h['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return h
}

// ─── Contributions ───────────────────────────────────────────

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionsData {
  total: { lastYear: number }
  contributions: ContributionDay[]
}

export async function getContributions(): Promise<ContributionsData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return (await res.json()) as ContributionsData
  } catch {
    return null
  }
}

// ─── Events ──────────────────────────────────────────────────

export interface GitHubCommit {
  sha: string
  message: string
}

export interface GitHubEvent {
  id: string
  type: string
  repo: { id: number; name: string }
  payload: {
    commits?: GitHubCommit[]
    action?: string
    ref?: string
  }
  created_at: string
}

export async function getRecentEvents(): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USER}/events/public?per_page=50`,
      { next: { revalidate: 1800 }, headers: headers() }
    )
    if (!res.ok) return []
    return (await res.json()) as GitHubEvent[]
  } catch {
    return []
  }
}

// ─── Repos ───────────────────────────────────────────────────

export interface GitHubRepo {
  id: number
  name: string
  language: string | null
  pushed_at: string
  fork: boolean
}

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USER}/repos?sort=pushed&per_page=50&type=owner`,
      { next: { revalidate: 3600 }, headers: headers() }
    )
    if (!res.ok) return []
    return (await res.json()) as GitHubRepo[]
  } catch {
    return []
  }
}

// ─── Helpers ─────────────────────────────────────────────────

export function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const s = diffMs / 1000
  if (s < 3600)   return `${Math.floor(s / 60)}m`
  if (s < 86400)  return `${Math.floor(s / 3600)}h`
  if (s < 604800) return `${Math.floor(s / 86400)}d`
  return `${Math.floor(s / 604800)}w`
}

export const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178C6',
  JavaScript:  '#F7DF1E',
  Python:      '#3776AB',
  Java:        '#B07219',
  Vue:         '#42B883',
  HTML:        '#E34F26',
  CSS:         '#563D7C',
  'C++':       '#F34B7D',
  Go:          '#00ADD8',
  Rust:        '#DEA584',
  Shell:       '#89E051',
  Dart:        '#00B4AB',
  Kotlin:      '#A97BFF',
  Swift:       '#F05138',
}
