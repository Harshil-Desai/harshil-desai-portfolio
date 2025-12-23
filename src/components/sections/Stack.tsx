'use client'
import { motion } from "framer-motion"
import { stack } from "../../lib/stack-data" // assuming you extract to file

const Stack = () => {
  return (
    <section id="stack" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stack.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="bg-background border border-zinc-100/50 rounded-md p-4"
          >
            <h3 className="text-sm font-semibold mb-3 text-foreground">{cat.category}</h3>

            <div className="flex flex-wrap gap-3">
              {cat.items.map((item, j) => {
                const Icon = item.icon
                return (
                  <div key={j} className="relative group">
                    <Icon 
                      className="text-3xl text-foreground-secondary hover:text-foreground transition"
                    />

                    {/* Tooltip */}
                    <span className="
                      absolute left-1/2 -translate-x-1/2 bottom-8
                      opacity-0 group-hover:opacity-100 
                      pointer-events-none
                      bg-black text-white text-xs px-2 py-1 rounded
                      whitespace-nowrap transition
                    ">
                      {item.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Stack
