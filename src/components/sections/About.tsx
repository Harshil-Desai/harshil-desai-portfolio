'use client'

import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-0 px-0 my-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg font-semibold mb-4 text-foreground">About</h2>
        <div className="space-y-3">
          <p className="text-sm text-foreground-secondary leading-relaxed">
            I&apos;m a software engineer who loves building clean, reliable systems and solving problems in a way that 
            actually makes life easier for people. I enjoy turning ideas into things that feel smooth, fast, and fun 
            to use- both on the frontend and under the hood.
          </p>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            When I&apos;m not lost in code, I&apos;m usually experimenting with new tech, learning something random just because 
            it seems cool, or trying to explain an idea to someone and accidentally overengineering the example. I&apos;m a 
            big believer in continuous learning, thoughtful teamwork, and keeping a little bit of playful curiosity in 
            everything I build.
          </p>
        </div>
      </motion.div>
      <hr className="border-zinc-100 my-6" />
    </section>
  )
}

export default About;