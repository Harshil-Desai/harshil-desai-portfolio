'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Search, X, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface CommandDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  navigation: { name: string; href: string }[]
}

export function CommandDialog({ open, setOpen, navigation }: CommandDialogProps) {
  const [search, setSearch] = useState('')

  const filteredItems = navigation.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleNavigate = (href: string) => {
    setOpen(false)
    setTimeout(() => {
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
      setSearch('')
    }, 100)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] bg-card border border-border rounded-lg shadow-soft-lg animate-scale-in">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-5 h-5 text-foreground-muted mr-3" />
            <input
              type="text"
              placeholder="Search sections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 py-4 bg-transparent text-foreground placeholder:text-foreground-muted outline-none"
              autoFocus
            />
            <Dialog.Close className="p-2 hover:bg-muted rounded-md transition-colors">
              <X className="w-4 h-4 text-foreground-muted" />
            </Dialog.Close>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-foreground-muted text-sm">
                No results found for &quot;{search}&quot;
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted rounded-md transition-colors group"
                  >
                    <span className="text-foreground font-medium">{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-3 text-xs text-foreground-muted flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">ESC</kbd>
              <span>Close</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}