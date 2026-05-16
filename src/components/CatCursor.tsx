'use client'

import { useEffect } from 'react'

/**
 * Animated cursor-following cat.
 *
 * Draws a side-view orange tabby entirely from SVG primitives.
 * Runs toward the cursor at 3 px/frame, flips left/right based on
 * movement direction, gallops its legs while moving, wags its tail
 * when idle, and stops when it reaches the cursor.
 *
 * Equivalent to pasting the snippet before </body> — renders null in
 * React and mounts the SVG directly onto document.body via useEffect.
 */
export default function CatCursor() {
  useEffect(() => {
    // ── Inject CSS ──────────────────────────────────────────────────
    const style = document.createElement('style')
    style.textContent = `
      #cc-root {
        position: fixed; top: 0; left: 0;
        width: 0; height: 0; overflow: visible;
        pointer-events: none; z-index: 9999;
      }
    `
    document.head.appendChild(style)

    // ── Build SVG ───────────────────────────────────────────────────
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, 'svg')
    svg.id = 'cc-root'

    /** shorthand — create an SVG element with attributes */
    function el<T extends SVGElement>(
      tag: string,
      attrs: Record<string, string | number>,
    ): T {
      const e = document.createElementNS(NS, tag) as T
      for (const [k, v] of Object.entries(attrs))
        e.setAttribute(k, String(v))
      return e
    }
    function g(...children: SVGElement[]) {
      const grp = document.createElementNS(NS, 'g')
      children.forEach(c => grp.appendChild(c))
      return grp
    }

    // Palette
    const O  = '#E8821A' // main orange
    const OD = '#C96510' // dark orange / stripes
    const PK = '#FFB3BA' // ear-inner pink
    const NP = '#FF8FAB' // nose pink

    // ── Cat parts (all coords relative to local origin = body center) ──
    //
    // Body:          ellipse  cx=0   cy=−18  rx=24  ry=13
    // Body bottom:   y = −18 + 13 = −5   (legs attach here)
    // Body right:    x = 24  (neck/head attach here)
    // Legs bottom:   y ≈ +17
    // Head center:   (30, −40)
    // Ears top:      y ≈ −57
    // Feet → cursor: the wrapper is translated so (0,0)→(catX,catY);
    //                body center is therefore 18 px above catY on screen.

    // Tail — drawn behind body; rotated for idle wag around its base
    const tailEl = el('path', {
      d: 'M-10,0 C-27,-3 -33,-20 -22,-34 C-16,-43 -5,-38 -10,-27',
      stroke: O, 'stroke-width': 5.5, fill: 'none',
      'stroke-linecap': 'round',
    })
    const tailGrp = g(tailEl) // rotated each frame

    // Back legs (far = darker, drawn first so body occludes half)
    const bl1El  = el('rect', { x: -24, y: -5, width: 7, height: 22, rx: 3.5, fill: OD })
    const bl1Grp = g(bl1El)
    const bl2El  = el('rect', { x: -15, y: -4, width: 7, height: 20, rx: 3.5, fill: O  })
    const bl2Grp = g(bl2El)

    // Body
    const body = el('ellipse', { cx: 0, cy: -18, rx: 24, ry: 13, fill: O })
    const ts1  = el('path', { d: 'M-5,-30 Q-4,-18 -5,-6', stroke: OD, 'stroke-width': 1.8, fill: 'none', opacity: 0.6 })
    const ts2  = el('path', { d: 'M 5,-31 Q 6,-18  5,-6', stroke: OD, 'stroke-width': 1.8, fill: 'none', opacity: 0.6 })

    // Front legs (near = same orange as body, far = darker)
    const fl1El  = el('rect', { x:  8, y: -5, width: 7, height: 22, rx: 3.5, fill: OD })
    const fl1Grp = g(fl1El)
    const fl2El  = el('rect', { x: 16, y: -5, width: 7, height: 22, rx: 3.5, fill: O  })
    const fl2Grp = g(fl2El)

    // Neck
    const neck = el('ellipse', { cx: 22, cy: -28, rx: 11, ry: 9, fill: O })

    // Head
    const head = el('circle', { cx: 30, cy: -41, r: 15, fill: O })

    // Ears  (back ear left of front ear)
    const eb  = el('polygon', { points: '18,-46 22,-58 30,-46', fill: O  })
    const ebi = el('polygon', { points: '21,-46 23,-54 29,-46', fill: PK })
    const ef  = el('polygon', { points: '30,-46 34,-58 41,-46', fill: O  })
    const efi = el('polygon', { points: '32,-46 34,-53 39,-46', fill: PK })

    // Forehead stripes
    const hs1 = el('path', { d: 'M24,-53 Q24,-47 23,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })
    const hs2 = el('path', { d: 'M30,-55 Q30,-47 29,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })
    const hs3 = el('path', { d: 'M36,-53 Q36,-47 35,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })

    // Eye (green iris, dark pupil, white catchlight)
    const eyeOuter = el('ellipse', { cx: 38, cy: -43, rx: 4,   ry: 4.5, fill: '#2E6B1F' })
    const eyePupil = el('ellipse', { cx: 38, cy: -43, rx: 2.3, ry: 3.8, fill: '#0d0d0d' })
    const eyeShine = el('circle',  { cx: 39, cy: -45, r: 1.3,  fill: 'white' })

    // Nose
    const nose = el('polygon', { points: '45,-37 43,-34 47,-34', fill: NP })

    // Mouth
    const m1 = el('path', { d: 'M45,-34 Q43,-31 41,-32', stroke: '#5a3a2a', 'stroke-width': 1, fill: 'none' })
    const m2 = el('path', { d: 'M45,-34 Q47,-31 49,-32', stroke: '#5a3a2a', 'stroke-width': 1, fill: 'none' })

    // Whiskers (3 per side; on SVG flip the near-side ones auto-mirror)
    function wh(x1: number, y1: number, x2: number, y2: number) {
      return el('line', { x1, y1, x2, y2, stroke: '#8a7060', 'stroke-width': 0.85, opacity: 0.8 })
    }
    const whiskers = [
      wh(45, -38, 63, -41),
      wh(45, -36, 63, -36),
      wh(45, -34, 63, -30),
    ]

    // ── Assemble draw order ─────────────────────────────────────────
    const catGrp = g(
      tailGrp,
      bl1Grp, bl2Grp,
      body, ts1, ts2,
      fl1Grp, fl2Grp,
      neck,
      eb, ebi, ef, efi,
      head,
      hs1, hs2, hs3,
      eyeOuter, eyePupil, eyeShine,
      nose, m1, m2,
      ...whiskers,
    )
    svg.appendChild(catGrp)
    document.body.appendChild(svg)

    // ── Animation state ─────────────────────────────────────────────
    let catX = window.innerWidth  / 2
    let catY = window.innerHeight / 2
    let mouseX = catX, mouseY = catY
    let facingRight = true
    const SPEED     = 3   // px per frame
    const STOP_DIST = 5   // px — stop moving inside this radius

    // Leg rotation pivots = top-center of each leg rect
    // fl1: x=8  w=7 → pivotX=11.5  y=−5
    // fl2: x=16 w=7 → pivotX=19.5  y=−5
    // bl1: x=−24 w=7 → pivotX=−20.5 y=−5
    // bl2: x=−15 w=7 → pivotX=−11.5 y=−5
    const P = {
      fl1: [11.5, -5],  fl2: [19.5, -5],
      bl1: [-20.5, -5], bl2: [-11.5, -5],
      tail: [-10, 0],
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf: number

    function tick() {
      const dx   = mouseX - catX
      const dy   = mouseY - catY
      const dist = Math.hypot(dx, dy)
      const t    = performance.now() / 1000   // seconds

      // ── Move ───────────────────────────────────────────────
      const running = dist > STOP_DIST
      if (running) {
        catX += (dx / dist) * SPEED
        catY += (dy / dist) * SPEED
        if (Math.abs(dx) > 0.5) facingRight = dx > 0
      }

      // ── Legs & tail ────────────────────────────────────────
      if (running) {
        // Gallop: diagonal pairs (fl1+bl2) and (fl2+bl1) alternate
        const cycle = t * 9           // ~4.5 strides/s
        const a = Math.sin(cycle) * 30
        const b = -a                  // opposite phase

        fl1Grp.setAttribute('transform', `rotate(${a.toFixed(1)},${P.fl1})`)
        fl2Grp.setAttribute('transform', `rotate(${b.toFixed(1)},${P.fl2})`)
        bl1Grp.setAttribute('transform', `rotate(${b.toFixed(1)},${P.bl1})`)
        bl2Grp.setAttribute('transform', `rotate(${a.toFixed(1)},${P.bl2})`)
        // Tail streams back during run
        tailGrp.setAttribute('transform', `rotate(-28,${P.tail})`)
      } else {
        // Idle: legs square up, tail wags
        fl1Grp.removeAttribute('transform')
        fl2Grp.removeAttribute('transform')
        bl1Grp.removeAttribute('transform')
        bl2Grp.removeAttribute('transform')

        const wag = (Math.sin(t * 3.5) * 22).toFixed(1)
        tailGrp.setAttribute('transform', `rotate(${wag},${P.tail})`)
      }

      // ── Position & flip ────────────────────────────────────
      // translate(catX, catY) puts the local origin on the cursor;
      // scale(±1, 1) mirrors around that origin to flip direction.
      const sx = facingRight ? 1 : -1
      catGrp.setAttribute('transform', `translate(${catX.toFixed(1)},${catY.toFixed(1)}) scale(${sx},1)`)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      svg.remove()
      style.remove()
    }
  }, [])

  return null
}
