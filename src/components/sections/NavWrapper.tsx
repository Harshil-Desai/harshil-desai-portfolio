import Nav from './Nav'
import { getAllPosts } from '@/lib/posts'

// Server component: reads the filesystem to build the post list, then passes
// it to the client Nav. Keeps fs calls off the client bundle entirely.
export default function NavWrapper() {
  const posts = getAllPosts().map((p) => ({
    name: p.title,
    href: `/blog/${p.slug}`,
    description: p.description,
  }))

  return <Nav posts={posts} />
}
