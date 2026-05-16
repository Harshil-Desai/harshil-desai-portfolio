import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { MDXComponents } from 'mdx/types'
import Nav from '@/components/sections/NavWrapper'
import { BlogLayout } from '@/components/blog/BlogLayout'
import { mdxComponents } from '@/components/blog/MDXComponents'
import { getAllSlugs, getPostMeta } from '@/lib/posts'
import { SITE_URL, SITE_AUTHOR, SITE_NAME } from '@/lib/config'

type Props = {
  params: Promise<{ slug: string }>
}

// MDX files compiled by @next/mdx export a default component that accepts
// an optional `components` prop for overriding elements.
type MDXModule = {
  default: React.ComponentType<{ components?: MDXComponents }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = getPostMeta(slug)
  if (!meta) return {}

  const url = `${SITE_URL}/blog/${slug}`
  const publishedTime = new Date(meta.date + 'T00:00:00Z').toISOString()

  return {
    title: `${meta.title} — ${SITE_AUTHOR}`,
    description: meta.description,
    authors: [{ name: SITE_AUTHOR }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      publishedTime,
      authors: [SITE_AUTHOR],
      tags: meta.tags,
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
      creator: '@harshildesai',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const meta = getPostMeta(slug)
  if (!meta) notFound()

  let PostContent: MDXModule['default']
  try {
    const mod = (await import(`@/content/blog/${slug}.mdx`)) as MDXModule
    PostContent = mod.default
  } catch {
    notFound()
  }

  return (
    <>
      <Nav />
      <BlogLayout meta={meta}>
        <PostContent components={mdxComponents} />
      </BlogLayout>
    </>
  )
}
