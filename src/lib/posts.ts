import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog')

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: number
  draft: boolean
}

export type Post = PostMeta & {
  content: string
}

function parsePost(filename: string): PostMeta | null {
  const slug = filename.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
  const { data } = matter(raw)

  if (!data.title) return null

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string ?? '',
    tags: (data.tags as string[]) ?? [],
    readingTime: (data.readingTime as number) ?? 1,
    draft: (data.draft as boolean) ?? false,
  }
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => /\.mdx?$/.test(f))
  return files
    .map(parsePost)
    .filter((p): p is PostMeta => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMeta(slug: string): PostMeta | null {
  const filename = `${slug}.mdx`
  const filePath = path.join(POSTS_DIR, filename)
  if (!fs.existsSync(filePath)) return null
  return parsePost(filename)
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => /\.mdx?$/.test(f))
    .map(f => f.replace(/\.mdx?$/, ''))
}
