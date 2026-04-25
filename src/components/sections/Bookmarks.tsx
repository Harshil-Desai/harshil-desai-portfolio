import { ArrowUpRight } from 'lucide-react'

const BOOKMARKS = [
  { title: 'Devouring Details',            author: 'Rauno Freiberg',   on: '14.04.2026', url: 'https://rauno.me' },
  { title: 'Refactoring UI',               author: 'Adam Wathan',      on: '02.03.2026', url: 'https://refactoringui.com' },
  { title: 'The Pragmatic Programmer',     author: 'Hunt & Thomas',    on: '12.01.2026', url: '#' },
  { title: 'Designing Data-Intensive Apps',author: 'Martin Kleppmann', on: '05.10.2025', url: '#' },
]

export default function Bookmarks() {
  return (
    <section id="bookmarks" className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] flex items-baseline gap-1.5 mb-3">
        Bookmarks
        <span className="text-[13px] font-normal text-[var(--fg-muted)] tabular-nums">({BOOKMARKS.length})</span>
      </h2>
      <div className="space-y-3">
        {BOOKMARKS.map((b, i) => (
          <a key={i} href={b.url} target={b.url !== '#' ? '_blank' : undefined} rel="noreferrer" className="group block">
            <h4 className="text-[13px] font-medium text-[var(--fg)] mb-0.5 group-hover:underline underline-offset-2 inline-flex items-center gap-1">
              {b.title}
              <ArrowUpRight className="w-3 h-3 opacity-50" />
            </h4>
            <dl className="text-[12px] grid grid-cols-[110px_1fr] gap-y-0.5 gap-x-3">
              <dt className="text-[var(--fg-muted)]">Author</dt>
              <dd className="text-[var(--fg-secondary)]">{b.author}</dd>
              <dt className="text-[var(--fg-muted)]">Bookmarked on</dt>
              <dd className="text-[var(--fg-secondary)] font-mono">{b.on}</dd>
            </dl>
          </a>
        ))}
      </div>
    </section>
  )
}
