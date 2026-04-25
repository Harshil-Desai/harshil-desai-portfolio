const EXPERIENCE = [
  {
    id: 'exp-halma',
    company: 'Halma India Pvt. Ltd.',
    initials: 'H',
    color: '#0A4DA1',
    url: 'https://halma.com',
    roles: [
      {
        role: 'Software Engineer',
        type: 'Full-time · Ahmedabad',
        period: '01.2024—',
        duration: '~2y',
        points: [
          'Engineered a Kafka-based ingestion system (NestJS) handling a 60× surge from 1,000+ IoT devices across 30+ clients — eliminated packet loss at scale.',
          'Contributed to an EMEA GIS web product: interactive map (Vue.js, Leaflet, OpenStreetMap, Google Maps), real-time WebSocket + BLE telemetry, PostGIS-backed Postgres.',
          'Shipped a v2 overhaul of an enterprise SaaS platform — Angular frontend + NestJS backend, complete architectural and UI refresh.',
          'Migrated a distributed multi-repo codebase to a Turborepo + pnpm monorepo, improving shared-code reuse, build consistency, and team maintainability.',
          'Built a RAG-powered internal chatbot (Python) so new joiners can query device docs, protocols, and product knowledge — reduced onboarding friction.',
          'Introduced the Karate API testing framework; ran 4 × 3-hour training sessions for QA and Dev, standardizing test docs and coverage.',
        ],
        tags: ['NestJS', 'Angular', 'Vue.js', 'Kafka', 'PostGIS', 'WebSockets', 'Python', 'Turborepo', 'Karate'],
      },
    ],
  },
  {
    id: 'exp-barclays',
    company: 'Barclays Bank',
    initials: 'B',
    color: '#00AEEF',
    url: 'https://home.barclays',
    roles: [
      {
        role: 'Business Analyst Intern',
        type: 'Internship · Pune',
        period: '05.2023—07.2023',
        duration: '3m',
        points: [
          'Built a centralized web dashboard (Java, Spring Boot) consolidating API metadata from Git, OpenShift, and SQL — single source of truth for 500+ internal APIs.',
          'Dockerized multiple internal APIs, standardizing containerized deployment and reducing environment inconsistencies across dev/staging.',
          'Designed an optimized schema to ingest metadata from heterogeneous sources, automating collection and cutting manual reconciliation by 80%.',
        ],
        tags: ['Java', 'Spring Boot', 'Docker', 'OpenShift', 'SQL', 'Git'],
      },
    ],
  },
]

const EDUCATION = {
  title: 'B.Tech, Computer Science & Engineering',
  org: 'Sardar Vallabhbhai NIT, Surat — CGPA 8.32',
  period: '12.2020—05.2024',
  duration: '~3.5y',
  tags: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Software Engineering'],
}

export default function Experience() {
  return (
    <section id="experience" className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-4">Experience</h2>
      <div className="space-y-6">
        {EXPERIENCE.map(e => (
          <div key={e.id} id={e.id}>
            {/* Company header */}
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-[14px] shrink-0"
                style={{ background: e.color }}
              >
                {e.initials}
              </span>
              <a
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="text-[14.5px] font-semibold text-[var(--fg)] tracking-tight hover:underline underline-offset-2"
              >
                {e.company}
              </a>
            </div>

            {/* Roles */}
            <div className="pl-[46px] space-y-4">
              {e.roles.map((r, i) => (
                <div key={i}>
                  <h4 className="text-[13px] font-medium text-[var(--fg)] mb-1.5">{r.role}</h4>
                  <dl className="text-[12px] grid grid-cols-[110px_1fr] gap-y-1 gap-x-3 mb-2">
                    <dt className="text-[var(--fg-muted)]">Type</dt>
                    <dd className="text-[var(--fg-secondary)]">{r.type}</dd>
                    <dt className="text-[var(--fg-muted)]">Period</dt>
                    <dd className="text-[var(--fg-secondary)] font-mono">{r.period}</dd>
                    <dt className="text-[var(--fg-muted)]">Duration</dt>
                    <dd className="text-[var(--fg-secondary)] font-mono">{r.duration}</dd>
                  </dl>
                  <ul className="space-y-1.5 mt-2">
                    {r.points.map((p, j) => (
                      <li key={j} className="text-[12.5px] text-[var(--fg-secondary)] leading-[1.6] flex gap-2">
                        <span className="text-[var(--fg-muted)] mt-[6px] shrink-0">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {r.tags.map(t => (
                      <span key={t} className="text-[10.5px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Education */}
        <div>
          <h3 className="text-[13.5px] font-semibold text-[var(--fg)] mb-2">Education</h3>
          <div>
            <h4 className="text-[13px] font-medium text-[var(--fg)] mb-1.5">{EDUCATION.title}</h4>
            <dl className="text-[12px] grid grid-cols-[110px_1fr] gap-y-1 gap-x-3 mb-2">
              <dt className="text-[var(--fg-muted)]">Institution</dt>
              <dd className="text-[var(--fg-secondary)]">{EDUCATION.org}</dd>
              <dt className="text-[var(--fg-muted)]">Period</dt>
              <dd className="text-[var(--fg-secondary)] font-mono">{EDUCATION.period}</dd>
              <dt className="text-[var(--fg-muted)]">Duration</dt>
              <dd className="text-[var(--fg-secondary)] font-mono">{EDUCATION.duration}</dd>
            </dl>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {EDUCATION.tags.map(t => (
                <span key={t} className="text-[10.5px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
