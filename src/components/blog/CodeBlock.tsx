import { isValidElement, Children } from 'react'
import { codeToHtml } from 'shiki'
import { CopyButton } from './CopyButton'

interface PreProps {
  children?: React.ReactNode
}

// Async RSC: extracts lang + source from the <code> child that MDX places
// inside every fenced code block, highlights with Shiki, and injects a
// client-side CopyButton alongside the rendered HTML.
export async function CodeBlock({ children }: PreProps) {
  const codeEl = Children.only(children)

  if (
    !isValidElement<{ className?: string; children?: unknown }>(codeEl) ||
    typeof codeEl.props.children !== 'string'
  ) {
    // Fallback: render as plain pre (shouldn't happen for normal fenced blocks)
    return <pre className="blog-code-plain">{children}</pre>
  }

  const { className = '', children: rawCode } = codeEl.props
  const lang = className.replace('language-', '').trim() || 'text'
  const code = rawCode.trimEnd()

  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
    // Emit --shiki-light / --shiki-dark on each span instead of a single
    // color value — lets the .dark CSS selector in globals.css switch themes.
    defaultColor: false,
  })

  return (
    <div className="relative group my-5">
      <div
        className="rounded-lg border border-[var(--border)] overflow-hidden text-[13px] leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton code={code} />
    </div>
  )
}
