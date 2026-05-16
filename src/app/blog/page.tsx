import { ArrowUpRight } from 'lucide-react'
import Nav from '@/components/sections/NavWrapper'
import Footer from '@/components/sections/Footer'
import { getAllPosts } from '@/lib/posts'

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const metadata = {
  title: 'Writing — Harshil Desai',
  description: 'Notes on software, infrastructure, and things I find interesting.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

          {/* Section header — identical pattern to Projects / Experience */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] flex items-baseline gap-1.5">
              Writing
              <span className="text-[13px] font-normal text-[var(--fg-muted)] tabular-nums">
                ({posts.length})
              </span>
            </h1>
            <a
              href="/"
              className="text-[12px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors flex items-center gap-1"
            >
              ← Home
            </a>
          </div>

          {posts.length === 0 ? (
            <p className="text-[13px] text-[var(--fg-muted)]">No posts yet.</p>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <article key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="group block rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 hover:bg-[var(--muted)] transition-colors"
                  >
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[13.5px] font-semibold text-[var(--fg)] tracking-tight leading-snug group-hover:underline underline-offset-2">
                        {post.title}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 mt-px">
                        <time className="text-[11px] font-mono text-[var(--fg-muted)] whitespace-nowrap">
                          {formatDate(post.date)}
                        </time>
                        <ArrowUpRight className="w-3 h-3 text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Description */}
                    {post.description && (
                      <p className="mt-1 text-[12px] text-[var(--fg-muted)] leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    )}

                    {/* Tags + reading time */}
                    {(post.tags.length > 0 || post.readingTime) && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10.5px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {post.readingTime && (
                          <span className="text-[10.5px] font-mono text-[var(--fg-muted)] ml-auto shrink-0">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                    )}
                  </a>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}
