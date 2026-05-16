'use client'

import { useEffect } from 'react'

export default function CatCursor() {
  useEffect(() => {
    // No cursor on touch/mobile — bail immediately
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Expose cleanup handles outside the IIFE so the return fn can reach them
    let raf: number
    let svg: SVGSVGElement
    let styleEl: HTMLStyleElement
    let onMouseMove: (e: MouseEvent) => void

    // ── IIFE keeps all implementation details out of module scope ──────
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

      // Palette
      const O  = '#E8821A'  // main orange
      const OD = '#C96510'  // dark / stripes
      const PK = '#FFB3BA'  // ear inner
      const NP = '#FF8FAB'  // nose

      // ── Cat parts (local origin = body centre) ──────────────────────────
      //   Body ellipse: cx=0 cy=−18 rx=24 ry=13
      //   Body bottom y ≈ −5   (legs attach here)
      //   Head centre: (30, −41)

      // Tail — rendered behind body; rotated around its base each frame
      const tailEl  = el('path', {
        d: 'M-10,0 C-27,-3 -33,-20 -22,-34 C-16,-43 -5,-38 -10,-27',
        stroke: O, 'stroke-width': 5.5, fill: 'none', 'stroke-linecap': 'round',
      })
      const tailGrp = g(tailEl)

      // Back legs (far = darker, drawn first so body occludes top half)
      const bl1Grp = g(el('rect', { x: -24, y: -5, width: 7, height: 22, rx: 3.5, fill: OD }))
      const bl2Grp = g(el('rect', { x: -15, y: -4, width: 7, height: 20, rx: 3.5, fill: O  }))

      // Body
      const body = el('ellipse', { cx: 0, cy: -18, rx: 24, ry: 13, fill: O })
      const ts1  = el('path', { d: 'M-5,-30 Q-4,-18 -5,-6', stroke: OD, 'stroke-width': 1.8, fill: 'none', opacity: 0.6 })
      const ts2  = el('path', { d: 'M 5,-31 Q 6,-18  5,-6', stroke: OD, 'stroke-width': 1.8, fill: 'none', opacity: 0.6 })

      // Front legs (near = body-orange, far = darker)
      const fl1Grp = g(el('rect', { x:  8, y: -5, width: 7, height: 22, rx: 3.5, fill: OD }))
      const fl2Grp = g(el('rect', { x: 16, y: -5, width: 7, height: 22, rx: 3.5, fill: O  }))

      // Neck + head
      const neck = el('ellipse', { cx: 22, cy: -28, rx: 11, ry:  9, fill: O })
      const head = el('circle',  { cx: 30, cy: -41, r:  15,          fill: O })

      // Ears (back ear first so front ear overlaps)
      const eb  = el('polygon', { points: '18,-46 22,-58 30,-46', fill: O  })
      const ebi = el('polygon', { points: '21,-46 23,-54 29,-46', fill: PK })
      const ef  = el('polygon', { points: '30,-46 34,-58 41,-46', fill: O  })
      const efi = el('polygon', { points: '32,-46 34,-53 39,-46', fill: PK })

      // Forehead stripes
      const hs1 = el('path', { d: 'M24,-53 Q24,-47 23,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })
      const hs2 = el('path', { d: 'M30,-55 Q30,-47 29,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })
      const hs3 = el('path', { d: 'M36,-53 Q36,-47 35,-41', stroke: OD, 'stroke-width': 1.2, fill: 'none', opacity: 0.7 })

      // Eye
      const eyeOuter = el('ellipse', { cx: 38, cy: -43, rx: 4,   ry: 4.5, fill: '#2E6B1F' })
      const eyePupil = el('ellipse', { cx: 38, cy: -43, rx: 2.3, ry: 3.8, fill: '#0d0d0d' })
      const eyeShine = el('circle',  { cx: 39, cy: -45, r: 1.3,           fill: 'white'   })

      // Nose + mouth
      const nose = el('polygon', { points: '45,-37 43,-34 47,-34', fill: NP })
      const m1   = el('path', { d: 'M45,-34 Q43,-31 41,-32', stroke: '#5a3a2a', 'stroke-width': 1, fill: 'none' })
      const m2   = el('path', { d: 'M45,-34 Q47,-31 49,-32', stroke: '#5a3a2a', 'stroke-width': 1, fill: 'none' })

      // Whiskers
      function wh(x1: number, y1: number, x2: number, y2: number) {
        return el('line', { x1, y1, x2, y2, stroke: '#8a7060', 'stroke-width': 0.85, opacity: 0.8 })
      }

      // ── Assemble back-to-front ───────────────────────────────────────────
      const catGrp = g(
        tailGrp,
        bl1Grp, bl2Grp,
        body, ts1, ts2,
        fl1Grp, fl2Grp,
        neck, eb, ebi, ef, efi,
        head, hs1, hs2, hs3,
        eyeOuter, eyePupil, eyeShine,
        nose, m1, m2,
        wh(45, -38, 63, -41),
        wh(45, -36, 63, -36),
        wh(45, -34, 63, -30),
      )
      svg.appendChild(catGrp)
      document.body.appendChild(svg)

      // ── Animation state ──────────────────────────────────────────────────
      let catX = window.innerWidth  / 2
      let catY = window.innerHeight / 2
      let mouseX = catX, mouseY = catY
      let facingRight = true

      const SPEED     = 3  // px per frame
      const STOP_DIST = 5  // radius where cat stops chasing

      // Leg-rotation pivots = top-centre of each leg rect
      //   fl1: x=8  w=7  → pivotX=11.5  y=−5
      //   fl2: x=16 w=7  → pivotX=19.5  y=−5
      //   bl1: x=−24 w=7 → pivotX=−20.5 y=−5
      //   bl2: x=−15 w=7 → pivotX=−11.5 y=−5
      const P = {
        fl1:  [11.5,  -5] as const,
        fl2:  [19.5,  -5] as const,
        bl1:  [-20.5, -5] as const,
        bl2:  [-11.5, -5] as const,
        tail: [-10,    0] as const,
      }

      onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
      window.addEventListener('mousemove', onMouseMove)

      function tick() {
        const dx   = mouseX - catX
        const dy   = mouseY - catY
        const dist = Math.hypot(dx, dy)
        const t    = performance.now() / 1000  // seconds

        const running = dist > STOP_DIST

        // ── Move ──────────────────────────────────────────────────────────
        if (running) {
          catX += (dx / dist) * SPEED
          catY += (dy / dist) * SPEED
          if (Math.abs(dx) > 0.5) facingRight = dx > 0
        }

        // ── Body bob: gentle vertical oscillation while running ────────────
        //   Twice the leg-cycle frequency so it bobs on each stride
        const bob = running ? Math.sin(t * 18) * 1.5 : 0

        // ── Legs + tail ───────────────────────────────────────────────────
        if (running) {
          // Diagonal gallop: (fl1+bl2) vs (fl2+bl1) in opposite phase
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

        // ── Position + horizontal flip ─────────────────────────────────────
        //   translate(catX, catY+bob) places the local origin on screen;
        //   scale(±1,1) mirrors the whole drawing for direction changes.
        const sx = facingRight ? 1 : -1
        catGrp.setAttribute(
          'transform',
          `translate(${catX.toFixed(1)},${(catY + bob).toFixed(1)}) scale(${sx},1)`,
        )

        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    })()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      svg?.remove()
      styleEl?.remove()
    }
  }, [])

  return null
}
