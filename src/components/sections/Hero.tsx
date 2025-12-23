'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, MapPin } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/harshildesai', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/harshildesai', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@harshildesai.com', label: 'Email' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Name & Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Harshil Desai
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-foreground-secondary">
              <span>Software Engineer</span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground-secondary font-medium max-w-2xl mx-auto"
          >
            Solving problems{' '}
            <span className="text-primary font-semibold">&gt;&gt;</span>{' '}
            meaningless side projects
          </motion.p>

          {/* Current Role */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-foreground-secondary border border-border"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm md:text-base">
              Software Engineer @{' '}
              <a
                href="https://halma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold hover:text-primary transition-colors"
              >
                Halma Pvt. Ltd
              </a>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about building scalable systems, clean architecture, and creating
            exceptional user experiences through elegant code. Currently focused on
            full-stack development and cloud-native solutions.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-4 justify-center pt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-110 group"
              >
                <Icon className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
              </a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="#projects"
              className="px-6 py-3 hover:bg-primary-hover text-primary-foreground rounded-lg font-medium transition-all hover:shadow-soft-lg hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border hover:border-primary text-foreground hover:text-primary rounded-lg font-medium transition-all hover:shadow-soft"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-foreground-muted cursor-pointer hover:text-foreground transition-colors"
              onClick={() => {
                const aboutSection = document.querySelector('#about')
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}