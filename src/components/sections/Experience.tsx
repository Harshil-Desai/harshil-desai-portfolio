'use client'
import { motion } from 'framer-motion'

const experiences = [
  { company: 'Halma India Pvt. Ltd.', 
    role: 'Software Engineer', 
    period: '01-2024 - Present', 
    points: [
      'Built and maintained an event-driven asset monitoring SaaS platform - REST APIs (NestJS), Angular UI, and Kafka-based ingestion handling 10,000+ real-time GPS data points daily.',
      'Designed IoT data pipeline and load-tested with JMeter to validate 10x traffic surge handling.',
      'Collaborated on a real-time GIS system and contributed to scalability and technology evaluation decisions.',
    ]
  },
  { company: 'Barclays Bank', 
    role: 'Business Analyst Intern', 
    period: '05-2023 - 07-2023', 
    points: [
      'Built a centralized dashboard consolidating API metadata from Git, OpenShift, and SQL databases - single source of truth for 50+ internal APIs.',
      'Automated data collection via REST API integrations, reducing manual reconciliation by 80% and developer query time by 60%.',
    ]
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
            <ul className="mt-2 space-y-1.5 text-xs text-foreground-secondary">
              {exp.points.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-[2px] text-zinc-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default Experience
