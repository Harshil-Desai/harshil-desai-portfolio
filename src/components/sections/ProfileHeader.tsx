'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import Image from "next/image"

const socialLinks = [
  { icon: Github, href: 'https://github.com/harshil-desai', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/harshil-desai-a89918201/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hdesai1633@gmail.com', label: 'Email' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  },
}

export default function ProfileHeader() {
  return (
    <section id="hero" className="pt-16 pb-4">
      {/* Cover Photo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full aspect-4/2 rounded-lg mb-8 bg-linear-to-br from-blue-200 via-blue-100 to-blue-50 border border-zinc-100/50 overflow-hidden"
      >
        {/* Placeholder cover with gradient */}
        <div className="w-full h-full bg-linear-to-r from-primary/10 to-accent/10 flex items-center justify-center text-zinc-300">
          {/* <span className="text-sm font-medium">[your-cover-url]</span> */}
          <Image
              src="/images/cover-photo.png"
              alt="Harshil Desai Cover"
              width={720}
              height={100}
              className="object-cover"
              priority
            />
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          {/* Avatar - Positioned over cover */}
          {/* <motion.div
            variants={itemVariants}
            className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-accent border-2 border-white/20 shadow-md flex items-center justify-center text-3xl font-bold text-white shrink-0"
          > */}
            <Image
              src="/images/profilepic.png"
              alt="Harshil Desai"
              width={64}
              height={64}
              className="rounded-full "
              priority
            />
          {/* </motion.div> */}

          {/* Profile Info */}
          <motion.div variants={itemVariants} className="flex-1 space-y-2 pb-1">
            <h1 className="text-xl font-semibold text-foreground">
              Harshil Desai
            </h1>
            <p className="text-sm text-zinc-500">
              @Harshil70781170
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="flex gap-2">
            <a
              href="#projects"
              className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-medium rounded-lg transition-all"
            >
              View Projects
            </a>
            <a
              href="https://x.com/Harshil70781170"
              target='blank'
              className="px-3 py-1.5 border border-zinc-100 hover:border-primary text-foreground hover:text-primary text-xs font-medium rounded-lg transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-zinc-600 leading-relaxed max-w-2xl"
        >
          Software Engineer with 1+ year of experience building secure, scalable applications and RESTful APIs. Strong foundation in
Object-Oriented Programming, Data Structures & Algorithms, and full-stack development. Proven track record in designing
solutions, collaborating with cross-functional teams, and delivering features within deadlines. Experienced in production
systems, incident management, and following quality assurance best practices.
        </motion.p>

        {/* Stats Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-700">
            <MapPin className="w-3 h-3" />
            <span>Ahmedabad, Gujarat</span>
          </div>
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-700">
            <span className="text-sm font-semibold">50+</span>
            <span>Projects</span>
          </div> */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-md text-xs text-zinc-700">
            <span className="text-sm font-semibold">1Y+</span>
            <span>Experience</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg border border-zinc-100 hover:border-primary hover:bg-primary/5 transition-all opacity-70 hover:opacity-100"
            >
              <Icon className="w-4 h-4 text-foreground" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Subtle divider */}
      <hr className="border-zinc-100 my-8" />
    </section>
  )
}
