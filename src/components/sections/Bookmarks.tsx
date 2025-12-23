'use client'
import { motion } from 'framer-motion'
import { Bookmark, ExternalLink } from 'lucide-react'

const bookmarks = [
  { title: 'Favorite Tool', url: '#', description: 'Amazing productivity tool' },
  { title: 'Useful Resource', url: '#', description: 'Great learning resource' }
]

const Bookmarks = () => {
  return (
    <section id="bookmarks" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Bookmarks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarks.map((bm, i) => (
          <motion.a 
            key={i} 
            href={bm.url} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }} 
            className="flex gap-3 items-start bg-background border border-zinc-100/50 rounded-md p-4 hover:shadow-sm transition-shadow"
          >
            <Bookmark className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                {bm.title}
                <ExternalLink className="w-3 h-3" />
              </h3>
              <p className="text-xs text-foreground-secondary mt-0.5">{bm.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Bookmarks