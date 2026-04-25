import {
  getRecentEvents,
  getRepos,
  timeAgo,
  LANG_COLORS,
  type GitHubEvent,
  type GitHubRepo,
} from '@/lib/github'

// ─── Language breakdown ───────────────────────────────────────

function buildLangBreakdown(repos: GitHubRepo[]) {
  const count: Record<string, number> = {}
  repos
    .filter(r => !r.fork && r.language)
    .forEach(r => { count[r.language!] = (count[r.language!] || 0) + 1 })

  const total = Object.values(count).reduce((a, b) => a + b, 0)
  if (total === 0) return []

  const sorted = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Normalise to 100%
  const pcts = sorted.map(([name, n]) => ({
    name,
    pct: Math.round((n / total) * 100),
    color: LANG_COLORS[name] ?? '#9CA3AF',
  }))

  // Fix rounding drift so sum = 100
  const drift = 100 - pcts.reduce((a, b) => a + b.pct, 0)
  if (pcts.length > 0) pcts[0].pct += drift

  return pcts
}

// ─── Activity feed ────────────────────────────────────────────

interface ActivityItem {
  repo: string
  msg: string
  lang: string
  color: string
  ago: string
}

function buildActivity(events: GitHubEvent[], repos: GitHubRepo[]): ActivityItem[] {
  const repoLang: Record<string, string> = {}
  repos.forEach(r => { repoLang[`Harshil-Desai/${r.name}`] = r.language ?? 'Code' })

  const items: ActivityItem[] = []

  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue
    if (items.length >= 6) break

    const repoName = ev.repo.name.replace('Harshil-Desai/', '')
    const commits = ev.payload.commits ?? []
    // Take the last commit message in the push (most recent in the set)
    const raw = commits.length > 0
      ? commits[commits.length - 1].message.split('\n')[0]
      : `pushed to ${repoName}`

    const lang = repoLang[ev.repo.name] ?? 'Code'

    items.push({
      repo: repoName,
      msg: raw,
      lang,
      color: LANG_COLORS[lang] ?? '#9CA3AF',
      ago: timeAgo(ev.created_at),
    })
  }

  return items
}

// ─── Component ────────────────────────────────────────────────

export default async function NowBuilding() {
  const [events, repos] = await Promise.all([getRecentEvents(), getRepos()])

  const langBreakdown = buildLangBreakdown(repos)
  const activity = buildActivity(events, repos)

  const repoCount = repos.filter(r => !r.fork).length

  // Conic gradient stops for language donut
  let acc = 0
  const stops = langBreakdown.map(l => {
    const start = acc
    acc += l.pct
    return `${l.color} ${start}% ${acc}%`
  }).join(', ')

  const hasActivity = activity.length > 0
  const hasLangs = langBreakdown.length > 0

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">Now Building</h2>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--fg-muted)]">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          live
        </span>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        {/* Language breakdown row */}
        {hasLangs && (
          <div className="grid grid-cols-[auto_1fr] gap-4 p-4 border-b border-[var(--border)]">
            {/* Donut */}
            <div className="relative w-[72px] h-[72px] shrink-0">
              <div
                className="w-full h-full rounded-full"
                style={{ background: stops ? `conic-gradient(${stops})` : 'var(--muted)' }}
              />
              <div className="absolute inset-[10px] rounded-full bg-[var(--card)] flex flex-col items-center justify-center">
                <span className="text-[14px] font-semibold text-[var(--fg)] tabular-nums leading-none">
                  {repoCount}
                </span>
                <span className="text-[9px] text-[var(--fg-muted)] uppercase tracking-wider mt-0.5">
                  repos
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="min-w-0">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[12px] text-[var(--fg-muted)]">All repos · by language</span>
                <a
                  href={`https://github.com/Harshil-Desai?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)] font-mono transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
              <div className="space-y-1">
                {langBreakdown.map(l => (
                  <div key={l.name} className="flex items-center gap-2 text-[11.5px]">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: l.color }} />
                    <span className="text-[var(--fg-secondary)] flex-1">{l.name}</span>
                    <span className="text-[var(--fg-muted)] font-mono tabular-nums">{l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity feed */}
        {hasActivity ? (
          <ul className="divide-y divide-[var(--border)]">
            {activity.map((a, i) => (
              <li key={i} className="px-4 py-2.5 flex items-center gap-3 hover:bg-[var(--muted)] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} title={a.lang} />
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-[var(--fg)] truncate">{a.msg}</div>
                  <div className="text-[11px] text-[var(--fg-muted)] font-mono truncate">{a.repo}</div>
                </div>
                <span className="text-[10.5px] text-[var(--fg-muted)] font-mono tabular-nums shrink-0">
                  {a.ago} ago
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-6 text-center text-[12px] text-[var(--fg-muted)]">
            No recent public activity
          </div>
        )}
      </div>
    </section>
  )
}
