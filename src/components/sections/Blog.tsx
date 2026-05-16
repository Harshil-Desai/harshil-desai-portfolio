'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const POSTS = [
  {
    title: 'Building a Monorepo with Turborepo and pnpm',
    date: 'Apr 12, 2025',
    excerpt: 'How I structured a shared-UI monorepo for Atomic Dev Tools — package boundaries, generator scripts, and keeping build times fast.',
    href: '#',
  },
  {
    title: 'WebSockets in FastAPI: Real-Time Neuron Activations',
    date: 'Feb 28, 2025',
    excerpt: 'Streaming live gradient and activation data from a Python training loop to a Three.js frontend without blocking the event loop.',
    href: '#',
  },
  {
    title: 'Framer Motion Micro-Interactions as Game Mechanics',
    date: 'Jan 7, 2025',
    excerpt: 'In SkillIssue, animations are part of the puzzle. Here\'s how I used frame-perfect motion variants to encode hidden solutions.',
    href: '#',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] flex items-baseline gap-1.5">
          Writing
          <span className="text-[13px] font-normal text-[var(--fg-muted)] tabular-nums">({POSTS.length})</span>
        </h2>
        <a href="/blog" className="text-[12px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition flex items-center gap-1">
          All Posts <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      <div className="space-y-2">
        {POSTS.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            viewport={{ once: true }}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 hover:bg-[var(--muted)] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <a
                  href={post.href}
                  className="text-[13.5px] font-semibold text-[var(--fg)] tracking-tight hover:underline underline-offset-2 leading-snug"
                >
                  {post.title}
                </a>
                <p className="text-[12px] text-[var(--fg-muted)] mt-0.5 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <time className="text-[11px] font-mono text-[var(--fg-muted)] shrink-0 mt-0.5 whitespace-nowrap">
                {post.date}
              </time>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
