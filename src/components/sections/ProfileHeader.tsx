'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Globe, User, CreditCard, ExternalLink } from 'lucide-react'

function Clock() {
  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    setTime(new Date())
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  if (!time) return null
  const fmt = time.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata',
  })
  return <span className="font-mono tabular-nums">{fmt}</span>
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] py-2 gap-3 border-b border-[var(--border)] last:border-b-0">
      <dt className="text-[12px] text-[var(--fg-muted)] flex items-center gap-1.5">{label}</dt>
      <dd className="text-[13px] text-[var(--fg-secondary)] flex items-center flex-wrap gap-1.5">{children}</dd>
    </div>
  )
}

export default function ProfileHeader() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copy = (field: string, value: string) => {
    navigator.clipboard?.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1300)
  }

  return (
    <section id="hero" className="pt-6 pb-2">
      {/* Avatar + name */}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--muted)]">
            <Image
              src="/images/profilepic.png"
              alt="Harshil Desai"
              width={72}
              height={72}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Online status dot */}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg)]" />
        </div>

        <div className="flex-1 pt-1">
          <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[var(--fg)] leading-tight flex items-center gap-1.5 flex-wrap">
            Harshil Desai
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white shrink-0">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </h1>
          <p className="text-[13.5px] text-[var(--fg-secondary)] mt-1 leading-snug">
            Full-stack engineer building scalable, event-driven systems. Small details matter.
          </p>
        </div>
      </div>

      {/* Overview vCard table */}
      <div className="mt-6">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-3">Overview</h2>
        <dl className="text-[13px] border-y border-[var(--border)]">
          <Row label={<><User className="w-3.5 h-3.5 opacity-60" /> Role</>}>
            <span className="text-[var(--fg)]">Software Engineer @</span>
            <a href="#exp-halma" className="text-[var(--fg)] underline underline-offset-2 decoration-[var(--border-hover)] hover:decoration-[var(--fg)] transition-colors">
              Halma India
            </a>
          </Row>

          <Row label={<><CreditCard className="w-3.5 h-3.5 opacity-60" /> Status</>}>
            <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11.5px] font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to opportunities
            </span>
          </Row>

          <Row label={<><MapPin className="w-3.5 h-3.5 opacity-60" /> Location</>}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ahmedabad%2C+Gujarat"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--fg)] hover:underline underline-offset-2"
            >
              Ahmedabad, Gujarat
            </a>
            <span className="ml-1 text-[var(--fg-muted)]">
              <Clock />
            </span>
          </Row>

          <Row label={<><Phone className="w-3.5 h-3.5 opacity-60" /> Phone</>}>
            <button
              onClick={() => copy('phone', '+91-635-473-7756')}
              className="text-[var(--fg)] font-mono hover:underline underline-offset-2 text-left"
            >
              {copiedField === 'phone'
                ? <span className="text-emerald-600">copied · +91-635-473-7756</span>
                : '+91-635-473-7756 · click to copy'}
            </button>
          </Row>

          <Row label={<><ExternalLink className="w-3.5 h-3.5 opacity-60" /> Email</>}>
            <button
              onClick={() => copy('email', 'hdesai1633@gmail.com')}
              className="text-[var(--fg)] font-mono hover:underline underline-offset-2 text-left"
            >
              {copiedField === 'email'
                ? <span className="text-emerald-600">copied · hdesai1633@gmail.com</span>
                : 'hdesai1633@gmail.com · click to copy'}
            </button>
          </Row>

          <Row label={<><Globe className="w-3.5 h-3.5 opacity-60" /> Website</>}>
            <a href="https://harshildesai.me" className="text-[var(--fg)] hover:underline underline-offset-2">
              harshildesai.me
            </a>
          </Row>

          <Row label="Pronouns">
            <span className="text-[var(--fg-secondary)]">he/him</span>
          </Row>
        </dl>
      </div>
    </section>
  )
}
