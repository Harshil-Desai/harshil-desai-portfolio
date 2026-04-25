import { ArrowUpRight } from 'lucide-react'

const SOCIALS = [
  {
    name: 'GitHub',
    handle: 'Harshil-Desai',
    url: 'https://github.com/Harshil-Desai',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'harshil-desai-a89918201',
    url: 'https://linkedin.com/in/harshil-desai-a89918201',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <rect x="2" y="9" width="4" height="13" />
        <circle cx="4" cy="4" r="2" />
        <path d="M9 9h4v2c.6-1.1 2-2.3 4-2.3 4.3 0 5 2.8 5 6.4V22h-4v-6.6c0-1.6-.6-2.7-2.1-2.7-1.6 0-2.5 1.1-2.9 2.1-.1.4-.2.9-.2 1.4V22H9V9z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    handle: '@harshildesai',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M18.244 2H21.5l-7.49 8.56L23 22h-6.79l-5.32-6.96L4.8 22H1.54l8.02-9.16L1 2h6.91l4.81 6.36L18.244 2zm-1.18 18h1.88L7.04 4H5.06l12 16z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'hdesai1633@gmail.com',
    url: 'mailto:hdesai1633@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    name: 'Website',
    handle: 'harshildesai.me',
    url: 'https://harshildesai.me',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
  },
]

export default function Socials() {
  return (
    <section className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-3">Social Links</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SOCIALS.map(s => (
          <a
            key={s.name}
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--muted)] transition-colors"
          >
            <span className="w-8 h-8 rounded-md flex items-center justify-center bg-[var(--muted)] text-[var(--fg)] border border-[var(--border)] shrink-0">
              {s.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-[var(--fg)] leading-tight">{s.name}</div>
              <div className="text-[11px] text-[var(--fg-muted)] truncate">{s.handle}</div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        ))}
      </div>
    </section>
  )
}
