export default function TLDR() {
  return (
    <section id="tldr" className="my-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--muted)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--fg-secondary)]">
            TL;DR
          </span>
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--fg-secondary)]">
          Full-stack engineer at{' '}
          <span className="text-[var(--fg)] font-medium">Halma India</span>, building
          production systems with{' '}
          <span className="text-[var(--fg)] font-medium">Kafka, NestJS, Angular, Vue, and React</span>.
          I work across{' '}
          <span className="text-[var(--fg)] font-medium">IoT and GIS</span> domains —
          streaming sensor data pipelines, real-time maps, and the APIs that tie them together.
          Open to new opportunities where I can keep pushing on hard distributed-systems problems.
        </p>
      </div>
    </section>
  )
}
