'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Atomic Dev Tools',
    description:
      'A focused suite of browser-based dev utilities that removes the need for heavy desktop apps and context switching. Built with Next.js for instant interactions, keyboard-first workflows, and a polished dark-mode UX.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Harshil-Desai/atomic-dev-tools',
    demo: 'https://atomic-dev-tools-web.vercel.app/',
    image: '/images/atomic-dev-tools.png',
  },
  {
    title: 'skillissue',
    description:
      'A series of increasingly broken, frustrating, and passive-aggressive "ragebait" puzzles disguised as mundane web tasks. Every interaction is a challenge, but every obstacle has a fair, logical solution hidden in plain sight.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion'],
    github: 'https://github.com/Harshil-Desai/skillissue',
    demo: 'https://skillissue-eight.vercel.app/',
    image: '/images/skillissue.png',
  },
  {
    title: 'Neural Network Visualizer',
    description:
      'A full-stack app for real-time neural network training visualization. Python (FastAPI) backend streams live neuron activation data via WebSockets to a 3D interactive frontend built with Three.js, rendering 1000+ data updates per session.',
    tech: ['FastAPI', 'Python', 'WebSockets', 'Three.js', 'JavaScript'],
    github: 'https://github.com/Harshil-Desai',
    demo: 'https://nn-visualizer.onrender.com/',
    image: '/images/neural-network-visualizer.png',
  },
  {
    title: 'Time-Table Generator',
    description:
      'An academic scheduling tool that solves faculty/room/slot conflicts and outputs valid timetables automatically. It uses constraint checks with a greedy strategy to create practical schedules faster than manual workflows. Eliminates 20+ hours of manual scheduling work per semester.',
    tech: ['Django', 'Python', 'HTML', 'CSS'],
    github: 'https://github.com/Harshil-Desai/Time-Table-Generator',
    image: '',
  },
];

export default function Projects() {
  return (
    <section id='projects' className='py-0 px-0 my-6'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className='text-lg font-semibold mb-4 text-foreground'>Featured Projects</h2>
        <div className='space-y-4'>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className='bg-background border border-zinc-100/50 rounded-md p-4 hover:shadow-sm transition-shadow'
            >
              <a
                href={project.demo || project.github}
                target='_blank'
                rel='noopener noreferrer'
                className='group/image relative block overflow-hidden rounded-md border border-zinc-100/70 mb-3'
                aria-label={`${project.title} preview`}
              >
                <div className='relative h-48 sm:h-56 bg-zinc-50'>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className='object-cover transition-transform duration-300 group-hover/image:scale-105'
                      sizes='(max-width: 640px) 100vw, 768px'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900'>
                      <svg
                        viewBox='0 0 800 400'
                        className='w-full h-full opacity-70 transition-transform duration-300 group-hover/image:scale-105'
                        aria-hidden='true'
                      >
                        <defs>
                          <pattern id='grid' width='36' height='36' patternUnits='userSpaceOnUse'>
                            <path d='M 36 0 L 0 0 0 36' fill='none' stroke='currentColor' strokeWidth='1' />
                          </pattern>
                          <linearGradient id='lineGlow' x1='0' y1='0' x2='1' y2='1'>
                            <stop offset='0%' stopColor='currentColor' stopOpacity='0.1' />
                            <stop offset='100%' stopColor='currentColor' stopOpacity='0.45' />
                          </linearGradient>
                        </defs>
                        <rect width='800' height='400' className='text-zinc-600/40' fill='url(#grid)' />
                        <path
                          d='M0 280 C140 240, 220 320, 360 260 S620 210, 800 250'
                          fill='none'
                          stroke='url(#lineGlow)'
                          strokeWidth='3'
                        />
                        <g className='text-zinc-400/70'>
                          <circle cx='160' cy='266' r='4' fill='currentColor' />
                          <circle cx='360' cy='260' r='4' fill='currentColor' />
                          <circle cx='580' cy='226' r='4' fill='currentColor' />
                        </g>
                      </svg>
                      <span className='absolute bottom-3 right-3 text-[11px] text-zinc-300 border border-zinc-600/60 bg-zinc-900/70 rounded-md px-2 py-1'>
                        Timetable Engine
                      </span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-black/0 group-hover/image:bg-black/35 transition-colors duration-300' />
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300'>
                    <span className='p-2.5 rounded-full bg-white/95 text-zinc-900 shadow-sm'>
                      <ExternalLink className='w-4 h-4' />
                    </span>
                  </div>
                </div>
              </a>
              <h3 className='text-sm font-semibold mb-2 text-foreground'>{project.title}</h3>
              <p className='text-xs text-foreground-secondary mb-3 leading-relaxed'>{project.description}</p>
              <div className='flex flex-wrap gap-2 mb-3'>
                {project.tech.map((tech, j) => (
                  <span
                    key={j}
                    className='text-[11px] leading-4 px-2.5 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-zinc-700 whitespace-nowrap'
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className='flex gap-2'>
                <a
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-100 rounded-md text-xs font-medium text-primary hover:text-primary-hover hover:border-primary/40 hover:bg-primary/5 transition-colors'
                >
                  <Github className='w-3 h-3' />
                  Code
                </a>
                {project.demo ? (
                  <a
                    href={project.demo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-100 rounded-md text-xs font-medium text-primary hover:text-primary-hover hover:border-primary/40 hover:bg-primary/5 transition-colors'
                  >
                    <ExternalLink className='w-3 h-3' />
                    Demo
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

