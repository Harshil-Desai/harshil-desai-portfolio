'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Search, X, ArrowRight, Hash, FileText } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface SectionItem {
  type: 'section'
  name: string
  href: string
}

interface PostItem {
  type: 'post'
  name: string
  href: string
  description?: string
}

type CommandItem = SectionItem | PostItem

interface CommandDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  sections: { name: string; href: string }[]
  posts?: { name: string; href: string; description?: string }[]
}

export function CommandDialog({
  open,
  setOpen,
  sections,
  posts = [],
}: CommandDialogProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Reset state whenever the dialog opens or the query changes
  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const sectionItems: SectionItem[] = sections.map((s) => ({
    type: 'section' as const,
    name: s.name,
    href: s.href,
  }))

  const postItems: PostItem[] = posts.map((p) => ({
    type: 'post' as const,
    name: p.name,
    href: p.href,
    description: p.description,
  }))

  const q = search.toLowerCase()

  const filteredSections = sectionItems.filter((s) =>
    s.name.toLowerCase().includes(q)
  )
  const filteredPosts = postItems.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description ?? '').toLowerCase().includes(q)
  )

  // Flat list used for index-based focus management
  const flatItems = [...filteredSections, ...filteredPosts]

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)

      // For hash-based links, smooth-scroll if the element is already in the DOM
      // (same page). Otherwise fall through to router navigation.
      if (href.includes('#')) {
        const hash = href.split('#')[1]
        const el = document.getElementById(hash)
        if (el) {
          setTimeout(() => {
            const top =
              el.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top, behavior: 'smooth' })
          }, 150)
          return
        }
      }

      setTimeout(() => router.push(href), 100)
    },
    [router, setOpen]
  )

  // Input: ArrowDown moves to first result; Enter activates first result
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      resultRefs.current[0]?.focus()
    } else if (e.key === 'Enter' && flatItems.length > 0) {
      e.preventDefault()
      navigate(flatItems[0].href)
    }
  }

  // Result buttons: ArrowDown/Up move through the list; ArrowUp on first
  // returns focus to the input.
  function handleResultKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = index + 1
      if (next < flatItems.length) {
        resultRefs.current[next]?.focus()
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (index === 0) {
        inputRef.current?.focus()
      } else {
        resultRefs.current[index - 1]?.focus()
      }
    }
  }

  const totalResults = flatItems.length
  const showEmpty = search.length > 0 && totalResults === 0

  // Assign refs to flat index; called as ref callback on each button
  function setResultRef(el: HTMLButtonElement | null, index: number) {
    resultRefs.current[index] = el
  }

  function renderItem(item: CommandItem, flatIndex: number) {
    const isPost = item.type === 'post'

    return (
      <button
        key={item.href}
        ref={(el) => setResultRef(el, flatIndex)}
        onClick={() => navigate(item.href)}
        onKeyDown={(e) => handleResultKeyDown(e, flatIndex)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-muted rounded-md transition-colors group focus:bg-muted focus:outline-none"
      >
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="mt-[2px] shrink-0 text-foreground-muted">
            {isPost ? (
              <FileText className="w-3.5 h-3.5" />
            ) : (
              <Hash className="w-3.5 h-3.5" />
            )}
          </span>
          <div className="min-w-0">
            <div className="text-[13px] text-foreground font-medium leading-snug">
              {item.name}
            </div>
            {isPost && item.description && (
              <div className="text-[11.5px] text-foreground-muted mt-0.5 leading-snug line-clamp-1">
                {item.description}
              </div>
            )}
          </div>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-foreground-muted opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity shrink-0 ml-2" />
      </button>
    )
  }

  let flatIndex = 0

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content
          className="fixed left-[50%] top-[20%] z-50 w-full max-w-lg translate-x-[-50%] bg-card border border-border rounded-lg shadow-soft-lg animate-scale-in"
          aria-label="Command palette"
        >
          {/* Search input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-4 h-4 text-foreground-muted mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections and posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="flex-1 py-3.5 bg-transparent text-[13.5px] text-foreground placeholder:text-foreground-muted outline-none"
              autoFocus
            />
            <Dialog.Close className="p-1.5 hover:bg-muted rounded-md transition-colors ml-2">
              <X className="w-3.5 h-3.5 text-foreground-muted" />
            </Dialog.Close>
          </div>

          {/* Results */}
          <div className="max-h-[360px] overflow-y-auto p-2">
            {showEmpty ? (
              <div className="py-8 text-center text-[12.5px] text-foreground-muted">
                No results for &ldquo;{search}&rdquo;
              </div>
            ) : (
              <>
                {/* Sections group */}
                {filteredSections.length > 0 && (
                  <div className="mb-1">
                    <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-foreground-muted">
                      Sections
                    </div>
                    {filteredSections.map((item) => {
                      const node = renderItem(item, flatIndex)
                      flatIndex++
                      return node
                    })}
                  </div>
                )}

                {/* Posts group */}
                {filteredPosts.length > 0 && (
                  <div className="mb-1">
                    <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-foreground-muted">
                      Posts
                    </div>
                    {filteredPosts.map((item) => {
                      const node = renderItem(item, flatIndex)
                      flatIndex++
                      return node
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5 text-[11px] text-foreground-muted flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↵</kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">ESC</kbd>
              <span>Close</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
