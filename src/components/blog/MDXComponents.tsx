import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './CodeBlock'
import { interactives } from './interactives'

export const mdxComponents: MDXComponents = {
  // pre → Shiki-highlighted code block with copy button
  pre: (props) => {
    const { children, ...rest } = props as React.HTMLAttributes<HTMLPreElement>
    return <CodeBlock {...rest}>{children}</CodeBlock>
  },

  // Spread all registered interactives — available as JSX tags in every post
  ...interactives,
}
