const ABOUT = [
  "Software Engineer at Halma India, shipping across the stack — Kafka-based ingestion pipelines, NestJS backends, and Angular / Vue / React frontends for IoT and GIS products.",
  "I care about clean architecture and developer ergonomics. Recently led a multi-repo → monorepo migration and stood up a RAG-powered onboarding chatbot for our team.",
  "Outside work I build small, opinionated tools and weird browser games. Big believer in continuous learning, polish, and a little playful curiosity in everything I build.",
]

export default function About() {
  return (
    <section id="about" className="my-6">
      <h2 className="text-[15px] font-semibold tracking-tight text-[var(--fg)] mb-3">About</h2>
      <ul className="space-y-2.5">
        {ABOUT.map((p, i) => (
          <li key={i} className="text-[13.5px] text-[var(--fg-secondary)] leading-[1.65] flex gap-2.5">
            <span className="text-[var(--fg-muted)] mt-[8px] shrink-0">·</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
