import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
)

const PROJECTS = [
  {
    title: 'Atomic Dev Tools',
    initials: 'A',
    color: '#7C3AED',
    period: '08.2024—',
    description: 'A browser-based developer utility platform with zero-install tooling — API testing, JSON formatting, encoding, and more. Architected as a Turborepo + pnpm monorepo with shared UI and a generator-based registration system for adding new tools.',
    bullets: [
      'Reusable shared UI + utility packages across the monorepo',
      'Generator-based registration to scaffold new tools instantly',
      'Full-featured API tester: methods, headers, response formatting',
      'Performance-focused, dark-mode-first UI with sub-100ms interactions',
    ],
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Turborepo', 'pnpm'],
    github: 'https://github.com/Harshil-Desai/atomic-dev-tools',
    demo: 'https://atomic-dev-tools-web.vercel.app/',
    image: '/images/atomic-dev-tools.png',
  },
  {
    title: 'SkillIssue',
    initials: 'S',
    color: '#E11D48',
    period: '06.2025—',
    description: 'A browser-based puzzle game that gamifies UI interactions — broken buttons, misleading forms, and deceptive web behaviors turned into solvable logic challenges. Fully client-side state, zero backend, offline-capable.',
    bullets: [
      'Each puzzle has a fair, hidden, logical solution',
      'Game state in localStorage — fast loads, offline-capable',
      'Frame-perfect Framer Motion micro-interactions are part of the puzzle',
    ],
    tech: ['Next.js 15', 'TypeScript', 'Tailwind 4', 'Framer Motion'],
    github: 'https://github.com/Harshil-Desai/skillissue',
    demo: 'https://skillissue-eight.vercel.app/',
    image: '/images/skillissue.png',
  },
  {
    title: 'Neural Network Visualizer',
    initials: 'N',
    color: '#0EA5E9',
    period: '11.2023—',
    description: 'A full-stack interactive app that trains a real MNIST digit classifier in-browser and streams live neuron activations and gradients to a Three.js 3D frontend via WebSockets.',
    bullets: [
      'FastAPI endpoints for training control + dynamic architecture config',
      'Training lock for multi-user safety — no concurrent session conflicts',
      'Digit canvas with real-time inference + step-by-step teaching mode',
    ],
    tech: ['FastAPI', 'Python', 'NumPy', 'Three.js', 'WebSockets'],
    github: 'https://github.com/Harshil-Desai',
    demo: 'https://nn-visualizer.onrender.com/',
    image: '/images/neural-network-visualizer.png',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] flex items-baseline gap-1.5">
          Projects
          <span className="text-[13px] font-normal text-[var(--fg-muted)] tabular-nums">({PROJECTS.length})</span>
        </h2>
        <a href="#" className="text-[12px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition flex items-center gap-1">
          All Projects <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      <div className="space-y-6">
        {PROJECTS.map((p, i) => (
          <article key={i}>
            {/* Header row */}
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-[14px] shrink-0"
                style={{ background: p.color }}
              >
                {p.initials}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={p.demo || p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14.5px] font-semibold text-[var(--fg)] tracking-tight hover:underline underline-offset-2"
                >
                  {p.title}
                </a>
                <div className="text-[11.5px] text-[var(--fg-muted)] mt-px font-mono">{p.period}</div>
              </div>
              <div className="flex gap-1 shrink-0">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-md hover:bg-[var(--muted)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition"
                  aria-label="Source code"
                >
                  <GithubIcon />
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md hover:bg-[var(--muted)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition"
                    aria-label="Live demo"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            {p.image ? (
              <a
                href={p.demo || p.github}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--muted)] mb-3 ml-[46px]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 608px"
                  />
                </div>
              </a>
            ) : (
              <div className="ml-[46px] mb-3 rounded-lg border border-[var(--border)] aspect-video relative overflow-hidden bg-[var(--muted)]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border-hover) 1px, transparent 0)',
                    backgroundSize: '12px 12px',
                    opacity: 0.6,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[11px] text-[var(--fg-muted)] px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]">
                    no preview
                  </span>
                </div>
              </div>
            )}

            {/* Description + bullets + tags */}
            <div className="ml-[46px]">
              <p className="text-[12.5px] text-[var(--fg-secondary)] leading-[1.65]">{p.description}</p>
              <ul className="mt-2 space-y-1">
                {p.bullets.map((b, j) => (
                  <li key={j} className="text-[12.5px] text-[var(--fg-secondary)] leading-[1.6] flex gap-2">
                    <span className="text-[var(--fg-muted)] mt-[6px] shrink-0">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {p.tech.map(t => (
                  <span key={t} className="text-[10.5px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
