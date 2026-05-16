import { ArrowLeft } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'

interface BlogLayoutProps {
  meta: PostMeta
  children: React.ReactNode
}

export function BlogLayout({ meta, children }: BlogLayoutProps) {
  // Format date: "2026-05-16" → "May 16, 2026"
  const formattedDate = new Date(meta.date + 'T00:00:00').toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <main className="min-h-screen pt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Back link — same style as nav links */}
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[12px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
          Writing
        </a>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-[22px] font-semibold tracking-tight text-[var(--fg)] leading-snug mb-3">
            {meta.title}
          </h1>

          {/* Meta row: date · reading time */}
          <div className="flex items-center gap-2 mb-3">
            <time className="text-[11px] font-mono text-[var(--fg-muted)]">
              {formattedDate}
            </time>
            <span className="text-[var(--border-hover)] text-[11px]">·</span>
            <span className="text-[11px] font-mono text-[var(--fg-muted)]">
              {meta.readingTime} min read
            </span>
          </div>

          {/* Tags — identical pill to Experience/Projects */}
          {meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meta.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10.5px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {meta.description && (
            <p className="mt-4 text-[13.5px] text-[var(--fg-secondary)] leading-[1.65] border-l-2 border-[var(--border)] pl-3">
              {meta.description}
            </p>
          )}
        </header>

        <div className="border-t border-[var(--border)] mb-8" />

        {/* Body — .blog-prose applies all prose CSS from globals.css */}
        <div className="blog-prose">
          {children}
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-6">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[12px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
            Back to Writing
          </a>
        </div>
      </div>
    </main>
  )
}
