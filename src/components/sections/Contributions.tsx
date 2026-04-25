import { getContributions, type ContributionDay } from '@/lib/github'

const COLORS = [
  'var(--cell-0)',
  'var(--cell-1)',
  'var(--cell-2)',
  'var(--cell-3)',
  'var(--cell-4)',
]

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function buildGrid(contributions: ContributionDay[]) {
  // Pad to exactly 53×7 = 371 cells (oldest at front)
  const cells = [...contributions]
  while (cells.length < 371) cells.unshift({ date: '', count: 0, level: 0 })
  const trimmed = cells.slice(-371)

  // Group into 53 weeks of 7 days
  const weeks: ContributionDay[][] = []
  for (let w = 0; w < 53; w++) {
    weeks.push(trimmed.slice(w * 7, w * 7 + 7))
  }

  // Build month label row: 53 slots, label appears at first week of each month
  const monthRow = new Array<string>(53).fill('')
  let prevMonth = -1
  weeks.forEach((week, w) => {
    const firstDate = week.find(d => d.date)?.date
    if (!firstDate) return
    const m = new Date(firstDate).getMonth()
    if (m !== prevMonth) {
      monthRow[w] = MONTH_NAMES[m]
      prevMonth = m
    }
  })

  return { flat: trimmed, monthRow }
}

// Synthetic fallback (same deterministic noise as before)
function syntheticCells(): ContributionDay[] {
  const rnd = (x: number) => { const s = Math.sin(x * 13.37) * 4391.7; return s - Math.floor(s) }
  const cells: ContributionDay[] = []
  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const i = w * 7 + d
      let v = rnd(i + 1) * (d === 0 || d === 6 ? 0.55 : 1)
      if (w > 40) v += 0.18
      if (w < 6)  v *= 0.5
      let level: 0|1|2|3|4 = 0
      if (v > 0.18) level = 1
      if (v > 0.40) level = 2
      if (v > 0.62) level = 3
      if (v > 0.82) level = 4
      cells.push({ date: '', count: level * 3, level })
    }
  }
  return cells
}

export default async function Contributions() {
  const data = await getContributions()
  const contributions = data?.contributions ?? syntheticCells()
  const total = data?.total.lastYear ?? contributions.reduce((a, c) => a + c.count, 0)
  const { flat, monthRow } = buildGrid(contributions)

  return (
    <section className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-3">GitHub Contributions</h2>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
        <div className="overflow-x-auto">
          <div className="inline-block">
            {/* Month labels */}
            <div
              className="grid gap-[3px] mb-1"
              style={{ gridTemplateColumns: 'repeat(53, 10px)' }}
            >
              {monthRow.map((label, i) => (
                <div key={i} className="text-[9px] font-mono text-[var(--fg-muted)] truncate">
                  {label}
                </div>
              ))}
            </div>

            {/* Contribution cells: 53 cols × 7 rows, flowing column-by-column */}
            <div
              className="grid grid-flow-col gap-[3px]"
              style={{ gridTemplateRows: 'repeat(7, 10px)', gridAutoColumns: '10px' }}
            >
              {flat.map((cell, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{ background: COLORS[cell.level] }}
                  title={cell.date ? `${cell.count} contribution${cell.count !== 1 ? 's' : ''} on ${cell.date}` : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-[var(--fg-muted)]">
          <span>
            <span className="text-[var(--fg)] font-medium">{total.toLocaleString()}</span>{' '}
            contributions in the last year
          </span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {COLORS.map((c, i) => (
              <span key={i} className="w-[10px] h-[10px] rounded-[2px] inline-block" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
