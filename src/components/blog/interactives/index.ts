// ─── Interactive component registry ──────────────────────────────────────────
// To add a new embeddable: create the component file, then add one line here.
// The key becomes the JSX tag name usable inside any .mdx file, e.g.
//   <AnimatedCounter to={1000} label="requests per second" />
//
// All components in this map are automatically available in every post via
// MDXComponents.tsx — no per-post import needed.
// ─────────────────────────────────────────────────────────────────────────────

import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { AnimatedCounter } from './AnimatedCounter'

export const interactives: MDXComponents = {
  Callout,
  AnimatedCounter,
  // TokenBucketDemo,   ← future: one line
  // TrafficSimulator,  ← future: one line
}
