'use client'
import { motion } from 'framer-motion'

const experiences = [
  { company: 'Halma India Pvt. Ltd.', 
    role: 'Software Engineer', 
    period: '01-2024 - Present', 
    description: 'Delivered an event-driven, scalable asset monitoring platform, validating 2× IoT data ingestion via JMeter, building secure REST APIs (NestJS) and data-driven Angular UI, while collaborating cross-functionally on a real-time GIS system and evaluating technologies to optimize scalability and development efficiency.' 
  },
  { company: 'Barclays Bank', 
    role: 'Business Analyst Intern', 
    period: '05-2023 - 07-2023', 
    description: `Engineered a scalable, object-oriented API metadata platform aggregating 500+ internal APIs into a single source of truth, improving cross-team collaboration and developer productivity by 40% through strong database design and QA/QC practices.` 
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-0 px-0 my-6">
      <h2 className="text-lg font-semibold mb-4">Experience</h2>
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }} 
            className="border-l-2 border-zinc-200 pl-4 py-2"
          >
            <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{exp.company} • {exp.period}</p>
            <p className="text-xs text-foreground-secondary mt-2 leading-relaxed">{exp.description}</p>
          </motion.div>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Experience