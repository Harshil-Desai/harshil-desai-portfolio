const STACK = [
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Python',     color: '#3776AB' },
  { name: 'React',      color: '#61DAFB' },
  { name: 'Next.js',    color: 'currentColor' },
  { name: 'Angular',    color: '#DD0031' },
  { name: 'Vue.js',     color: '#42B883' },
  { name: 'Tailwind',   color: '#38BDF8' },
  { name: 'Framer',     color: '#0055FF' },
  { name: 'Node.js',    color: '#5FA04E' },
  { name: 'NestJS',     color: '#E0234E' },
  { name: 'Express',    color: 'currentColor' },
  { name: 'FastAPI',    color: '#009688' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'PostGIS',    color: '#336791' },
  { name: 'MongoDB',    color: '#47A248' },
  { name: 'Redis',      color: '#DC382D' },
  { name: 'SQL Server', color: '#A91D22' },
  { name: 'Kafka',      color: 'currentColor' },
  { name: 'Docker',     color: '#2496ED' },
  { name: 'Git',        color: '#F05032' },
  { name: 'Karate',     color: '#22B573' },
  { name: 'JMeter',     color: '#D22128' },
  { name: 'Turborepo',  color: '#EF4444' },
  { name: 'pnpm',       color: '#F69220' },
]

function TechBadge({ name, color }: { name: string; color: string }) {
  const bg = color === 'currentColor' ? 'var(--fg)' : color
  const textColor = color === 'currentColor' ? 'var(--bg)' : 'white'
  return (
    <span className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--muted)] transition-colors cursor-default">
      <span
        className="w-4 h-4 rounded-[4px] flex items-center justify-center text-[9px] font-bold shrink-0"
        style={{ background: bg, color: textColor }}
      >
        {name[0]}
      </span>
      <span className="text-[12px] text-[var(--fg-secondary)] group-hover:text-[var(--fg)]">{name}</span>
    </span>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-3">Stack</h2>
      <div className="flex flex-wrap gap-1.5">
        {STACK.map(s => <TechBadge key={s.name} {...s} />)}
      </div>
    </section>
  )
}
