'use client'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const honors = [
  { title: 'Best Innovation Award', org: 'Tech Conference 2023', year: '2023' },
  { title: 'Outstanding Contributor', org: 'Open Source Project', year: '2022' }
]

const Honors = () => {
  return (
    <section id="honors" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Honors & Awards</h2>
      <div className="space-y-3">
        {honors.map((honor, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }} 
            className="flex gap-3 items-start bg-background border border-zinc-100/50 rounded-md p-4"
          >
            <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">{honor.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{honor.org} • {honor.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Honors;