'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Atomic Dev Tools',
    description: 'A collection of instantly accessible, single-purpose developer tools designed to eliminate the friction of heavy desktop apps. Built with a clean, fast, dark-mode-first UI and full keyboard shortcut support.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Harshil-Desai/atomic-dev-tools',
    demo: 'https://atomic-dev-tools-web.vercel.app/'
  },
  {
    title: 'Time-Table Generator',
    description: 'Automated timetable creation system that generates conflict-free college schedules using a greedy algorithm.',
    tech: ['Django', 'Python', 'HTML', 'CSS'],
    github: 'https://github.com/Harshil-Desai/Time-Table-Generator',
    // demo: '#'
  },
  {
    title: 'Chat-Room',
    description: 'Real-time chat application with room-based messaging, powered by WebSockets for fast and seamless communication.',
    tech: ['React', 'Express', 'Socket.io', 'MUI'],
    github: 'https://github.com/Harshil-Desai/Chat-App',
    // demo: '#'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-0 px-0 my-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg font-semibold mb-4 text-foreground">Featured Projects</h2>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-background border border-zinc-100/50 rounded-md p-4 hover:shadow-sm transition-shadow"
            >
              <h3 className="text-sm font-semibold mb-2 text-foreground">{project.title}</h3>
              <p className="text-xs text-foreground-secondary mb-3 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech, j) => (
                  <span key={j} className="text-xs px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-md text-zinc-700">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.github} target='blank' className="text-primary hover:text-primary-hover transition-colors flex items-center gap-1 text-xs font-medium">
                  <Github className="w-3 h-3" />
                  Code
                </a>
                {project.demo ? (
                <a href={project.demo} target='blank' className="text-primary hover:text-primary-hover transition-colors flex items-center gap-1 text-xs font-medium">
                  <ExternalLink className="w-3 h-3" />
                  Demo
                </a>
                ) : <></>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}