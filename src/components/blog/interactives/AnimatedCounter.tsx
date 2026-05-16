'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
  /** Target value to count up to */
  to: number
  /** Starting value (default 0) */
  from?: number
  /** Label shown below the number */
  label?: string
  /** Animation duration in seconds (default 1.8) */
  duration?: number
  /** Optional unit appended to the number, e.g. "ms" or "%" */
  unit?: string
}

export function AnimatedCounter({
  to,
  from = 0,
  label,
  duration = 1.8,
  unit,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!inView) return
    // animate() from framer-motion can tween plain numbers and fire onUpdate
    // each frame — no MotionValue subscription gymnastics needed.
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out feel
      onUpdate(v) {
        setCount(Math.round(v))
      },
    })
    return controls.stop
  }, [inView, from, to, duration])

  const formatted = count.toLocaleString('en-US')

  return (
    <div
      ref={ref}
      className="my-5 flex flex-col items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] py-6 px-8"
    >
      <span className="font-mono text-[36px] font-semibold tracking-tight text-[var(--fg)] tabular-nums leading-none">
        {formatted}
        {unit && (
          <span className="ml-1 text-[22px] text-[var(--fg-muted)]">{unit}</span>
        )}
      </span>
      {label && (
        <span className="text-[12px] text-[var(--fg-muted)] font-mono tracking-wide">
          {label}
        </span>
      )}
    </div>
  )
}
