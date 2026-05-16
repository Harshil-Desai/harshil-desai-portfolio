'use client'

import { useEffect } from 'react'

export default function CatCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf: number
    let svg: SVGSVGElement
    let styleEl: HTMLStyleElement
    let onMouseMove: (e: MouseEvent) => void
    let onResize: () => void

    ;(() => {
      styleEl = document.createElement('style')
      styleEl.textContent = `
        #cc-root {
          position: fixed; top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none; z-index: 9999;
        }
      `
      document.head.appendChild(styleEl)

      const NS = 'http://www.w3.org/2000/svg'
      svg = document.createElementNS(NS, 'svg') as SVGSVGElement
      svg.id = 'cc-root'

      function el<T extends SVGElement>(tag: string, attrs: Record<string, string | number>): T {
        const e = document.createElementNS(NS, tag) as T
        for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v))
        return e
      }
      function g(...children: SVGElement[]) {
        const grp = document.createElementNS(NS, 'g')
        children.forEach(c => grp.appendChild(c))
        return grp
      }

      // Stroke color + helper so every shape gets non-scaling-stroke
      // (prevents stroke width from shrinking with the global scale transform)
      const C  = '#E8821A'
      const NE = 'non-scaling-stroke'

      function stroke(tag: string, attrs: Record<string, string | number>, sw = 1.5): SVGElement {
        return el(tag, { ...attrs, fill: 'none', stroke: C, 'stroke-width': sw, 'vector-effect': NE })
      }

      // ── Cat parts ────────────────────────────────────────────────────────
      // Tail (behind body)
      const tailEl = el('path', {
        d: 'M-10,0 C-27,-3 -33,-20 -22,-34 C-16,-43 -5,-38 -10,-27',
        stroke: C, 'stroke-width': 1.5, fill: 'none',
        'stroke-linecap': 'round', 'vector-effect': NE,
      })
      const tailGrp = g(tailEl)

      // Back legs (far pair — drawn first so body overlaps top half)
      const bl1Grp = g(stroke('rect', { x: -24, y: -5, width: 7, height: 22, rx: 3.5 }))
      const bl2Grp = g(stroke('rect', { x: -15, y: -4, width: 7, height: 20, rx: 3.5 }))

      // Body ellipse
      const body = stroke('ellipse', { cx: 0, cy: -18, rx: 24, ry: 13 })

      // Front legs (near pair)
      const fl1Grp = g(stroke('rect', { x:  8, y: -5, width: 7, height: 22, rx: 3.5 }))
      const fl2Grp = g(stroke('rect', { x: 16, y: -5, width: 7, height: 22, rx: 3.5 }))

      // Head (no neck ellipse — cleaner outline without double-outline seam)
      const head = stroke('circle', { cx: 30, cy: -41, r: 15 })

      // Single front ear
      const ear = stroke('polygon', { points: '30,-46 34,-58 41,-46' })

      // Eye — small filled dot
      const eye = el('circle', { cx: 38, cy: -43, r: 2.5, fill: C, 'vector-effect': NE })

      // Nose — tiny filled triangle
      const nose = el('polygon', { points: '45,-37 43,-34 47,-34', fill: C, 'vector-effect': NE })

      // Mouth
      const m1 = el('path', { d: 'M45,-34 Q43,-31 41,-32', stroke: C, 'stroke-width': 1, fill: 'none', 'vector-effect': NE })
      const m2 = el('path', { d: 'M45,-34 Q47,-31 49,-32', stroke: C, 'stroke-width': 1, fill: 'none', 'vector-effect': NE })

      // Whiskers
      function wh(x1: number, y1: number, x2: number, y2: number) {
        return el('line', { x1, y1, x2, y2, stroke: C, 'stroke-width': 0.85, opacity: 0.6, 'vector-effect': NE })
      }

      // ── Assemble ─────────────────────────────────────────────────────────
      const catGrp = g(
        tailGrp,
        bl1Grp, bl2Grp,
        body,
        fl1Grp, fl2Grp,
        head, ear,
        eye, nose, m1, m2,
        wh(45, -38, 63, -41),
        wh(45, -36, 63, -36),
        wh(45, -34, 63, -30),
      )
      svg.appendChild(catGrp)
      document.body.appendChild(svg)

      // ── 2D-plane mode ─────────────────────────────────────────────────────
      // Cat is pinned to the bottom of the viewport; only X chases the cursor.
      // FLOOR_OFFSET puts the cat's feet near the bottom edge.
      const SIZE        = 0.4
      const FLOOR_OFFSET = 48   // px from bottom of viewport
      const SPEED       = 3
      const STOP_DIST   = 5

      let catX = window.innerWidth  / 2
      let catY = window.innerHeight - FLOOR_OFFSET
      let mouseX    = catX
      let facingRight = true

      // Leg-rotation pivots (top-centre of each leg rect)
      const P = {
        fl1:  [11.5,  -5] as const,
        fl2:  [19.5,  -5] as const,
        bl1:  [-20.5, -5] as const,
        bl2:  [-11.5, -5] as const,
        tail: [-10,    0] as const,
      }

      onMouseMove = (e: MouseEvent) => { mouseX = e.clientX }
      window.addEventListener('mousemove', onMouseMove)

      onResize = () => { catY = window.innerHeight - FLOOR_OFFSET }
      window.addEventListener('resize', onResize)

      function tick() {
        const dx   = mouseX - catX
        const dist = Math.abs(dx)          // 1-D distance along X only
        const t    = performance.now() / 1000

        const running = dist > STOP_DIST
        if (running) {
          catX += (dx / dist) * SPEED
          facingRight = dx > 0
        }

        // Subtle vertical bob while running (stays on the floor plane)
        const bob = running ? Math.sin(t * 18) * 1.5 : 0

        if (running) {
          const a = (Math.sin(t * 9) * 30).toFixed(1)
          const b = (-parseFloat(a)).toFixed(1)
          fl1Grp.setAttribute('transform', `rotate(${a},${P.fl1})`)
          fl2Grp.setAttribute('transform', `rotate(${b},${P.fl2})`)
          bl1Grp.setAttribute('transform', `rotate(${b},${P.bl1})`)
          bl2Grp.setAttribute('transform', `rotate(${a},${P.bl2})`)
          tailGrp.setAttribute('transform', `rotate(-28,${P.tail})`)
        } else {
          fl1Grp.removeAttribute('transform')
          fl2Grp.removeAttribute('transform')
          bl1Grp.removeAttribute('transform')
          bl2Grp.removeAttribute('transform')
          tailGrp.setAttribute('transform', `rotate(${(Math.sin(t * 3.5) * 22).toFixed(1)},${P.tail})`)
        }

        const sx = facingRight ? SIZE : -SIZE
        catGrp.setAttribute(
          'transform',
          `translate(${catX.toFixed(1)},${(catY + bob).toFixed(1)}) scale(${sx},${SIZE})`,
        )

        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    })()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize',    onResize)
      svg?.remove()
      styleEl?.remove()
    }
  }, [])

  return null
}
