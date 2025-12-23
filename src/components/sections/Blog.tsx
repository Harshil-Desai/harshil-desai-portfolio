'use client'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const posts = [
  { title: 'Building Scalable APIs', date: '2024-01-15', excerpt: 'Best practices for API design...' },
  { title: 'React Performance Tips', date: '2024-01-10', excerpt: 'Optimize your React apps...' }
]

const Blog = () => {
  return (
    <section id="blog" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.article 
            key={i} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }} 
            className="bg-background border border-zinc-100/50 rounded-md p-4 hover:shadow-sm transition-shadow"
          >
            <h3 className="text-sm font-semibold mb-2 text-foreground">{post.title}</h3>
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
              <Calendar className="w-3 h-3" />
              {post.date}
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed">{post.excerpt}</p>
          </motion.article>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Blog;