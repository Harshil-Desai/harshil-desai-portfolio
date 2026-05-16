'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Search, Sun, Moon } from 'lucide-react'
import { CommandDialog } from '@/components/ui/command-dialog'

const SECTIONS = [
  { name: 'Projects',   href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Stack',      href: '/#stack' },
  { name: 'Writing',    href: '/blog' },
]

interface NavProps {
  posts?: { name: string; href: string; description?: string }[]
}

export default function Nav({ posts = [] }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', down)
    }
  }, [])

  const dark = resolvedTheme === 'dark'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-[var(--bg)] border-b border-transparent'
      }`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="text-[13px] font-medium tracking-tight text-[var(--fg)] flex items-center gap-1.5">
            <span className="font-mono text-[var(--fg-muted)]">/</span>
            harshil
          </a>

          {/* Center nav links */}
          <div className="hidden sm:flex items-center gap-0.5">
            {SECTIONS.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="px-2.5 py-1.5 text-[12.5px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors rounded-md hover:bg-[var(--muted)]"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right: search + theme toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 border border-[var(--border)] rounded-md text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-hover)] transition-colors"
            >
              <Search className="w-3 h-3" />
              <span>Search…</span>
              <kbd className="px-1 text-[10px] font-mono bg-[var(--muted)] rounded">⌘K</kbd>
            </button>
            <button
              onClick={() => setTheme(dark ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="ml-1 w-8 h-8 rounded-md flex items-center justify-center text-[var(--fg)] hover:bg-[var(--muted)] transition"
            >
              {mounted && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            </button>
          </div>
        </div>
      </nav>

      <CommandDialog open={open} setOpen={setOpen} sections={SECTIONS} posts={posts} />
    </>
  )
}
