'use client'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const certs = [
  { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Google Cloud Professional', issuer: 'Google', year: '2022' }
]

const Certifications = () => {
  return (
    <section id="certifications" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }} 
            className="flex gap-3 items-start bg-background border border-zinc-100/50 rounded-md p-4"
          >
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{cert.issuer} • {cert.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Certifications