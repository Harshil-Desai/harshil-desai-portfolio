import { getAllPosts } from '@/lib/posts'
import { SITE_URL, SITE_AUTHOR, SITE_NAME } from '@/lib/config'

// Escape the five characters that are significant inside XML text/attributes.
function x(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.date + 'T00:00:00Z').toUTCString()
      const categories = post.tags
        .map((t) => `      <category>${x(t)}</category>`)
        .join('\n')

      return `
    <item>
      <title>${x(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${x(post.description)}</description>
      <author>noreply@harshildesai.com (${x(SITE_AUTHOR)})</author>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`
    })
    .join('')

  const lastBuildDate =
    posts.length > 0
      ? new Date(posts[0].date + 'T00:00:00Z').toUTCString()
      : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>Writing by ${x(SITE_AUTHOR)} on software, infrastructure, and engineering.</description>
    <language>en-US</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
