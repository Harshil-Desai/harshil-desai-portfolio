"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Search } from 'lucide-react'
import { CommandDialog } from '@/components/ui/command-dialog'
              import { Moon, Sun } from "lucide-react"


const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Stack', href: '#stack' },
  // { name: 'Blog', href: '#blog' },
  // { name: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-zinc-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-12 lg:h-14">
            {/* Logo - Left aligned */}
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, '#hero')}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Harshil Desai
            </a>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-xs text-foreground-muted hover:text-foreground transition-colors opacity-70 hover:opacity-100"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right side: Search + Profile Pic */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground-muted hover:text-foreground border border-zinc-100/50 rounded-lg transition-all opacity-70 hover:opacity-100"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1 py-0.5 text-xs font-mono bg-muted rounded">
                  ⌘K
                </kbd>
              </button>
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 rounded-full flex items-center justify-center
                          bg-zinc-900 text-zinc-100
                          hover:bg-zinc-800
                          dark:bg-zinc-100 dark:text-zinc-900
                          dark:hover:bg-zinc-200
                          transition"
              >
                {mounted && (resolvedTheme === 'dark' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                ))}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Command Dialog */}
      <CommandDialog open={open} setOpen={setOpen} navigation={navigation} />
    </>
  )
}