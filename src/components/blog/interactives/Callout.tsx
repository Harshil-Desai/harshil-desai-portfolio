import { Info, Lightbulb, AlertTriangle, MessageSquare } from 'lucide-react'

type Variant = 'note' | 'tip' | 'warning' | 'info'

const CONFIG: Record<
  Variant,
  { icon: React.ReactNode; accent: string; label: string }
> = {
  note: {
    icon: <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-[1px]" />,
    accent: 'var(--border-hover)',
    label: 'Note',
  },
  info: {
    icon: <Info className="w-3.5 h-3.5 shrink-0 mt-[1px]" />,
    accent: '#3b82f6',
    label: 'Info',
  },
  tip: {
    icon: <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-[1px]" />,
    accent: '#10b981',
    label: 'Tip',
  },
  warning: {
    icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-[1px]" />,
    accent: '#f59e0b',
    label: 'Warning',
  },
}

interface CalloutProps {
  variant?: Variant
  title?: string
  children: React.ReactNode
}

export function Callout({ variant = 'note', title, children }: CalloutProps) {
  const { icon, accent, label } = CONFIG[variant]

  return (
    <div
      className="my-5 rounded-r-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13px]"
      style={{ borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <div className="flex items-start gap-2">
        <span style={{ color: accent }}>{icon}</span>
        <div className="min-w-0">
          <span
            className="text-[11px] font-semibold uppercase tracking-widest font-mono mr-2"
            style={{ color: accent }}
          >
            {title ?? label}
          </span>
          <div className="mt-1 text-[13px] text-[var(--fg-secondary)] leading-relaxed [&>p]:mb-0 [&>p]:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
