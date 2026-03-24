'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CTAModal from './CTAModal'
import { useState } from 'react'

/* ── Particle animation on canvas ── */
type Source = { x: number; y: number; color: string }
type Particle = {
  srcIdx: number
  t: number        // 0→1 progress along the bezier
  speed: number
  opacity: number
}

function cubicBezier(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
): { x: number; y: number } {
  const mt = 1 - t
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  }
}

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width  = W * window.devicePixelRatio
    canvas.height = H * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const cx = W * 0.55
    const cy = H * 0.5
    const hub = { x: cx, y: cy }

    const sources: Source[] = [
      { x: W * 0.15, y: H * 0.18, color: '#336791' }, // PostgreSQL
      { x: W * 0.15, y: H * 0.50, color: '#29B5E8' }, // Snowflake
      { x: W * 0.15, y: H * 0.82, color: '#4285F4' }, // BigQuery
      { x: W * 0.34, y: H * 0.26, color: '#FF9900' }, // S3
      { x: W * 0.34, y: H * 0.62, color: '#EA4335' }, // Kafka
      { x: W * 0.34, y: H * 0.90, color: '#47A248' }, // MongoDB
    ]

    const labels = ['Postgres', 'Snowflake', 'BigQuery', 'S3', 'Kafka', 'MongoDB']

    // Control points for bezier curves (makes smooth arcs into hub)
    const cps = sources.map((s) => ({
      cp1: { x: s.x + (hub.x - s.x) * 0.45, y: s.y },
      cp2: { x: hub.x - (hub.x - s.x) * 0.22, y: hub.y },
    }))

    // Build particles — 3 per source with staggered t offsets
    const particles: Particle[] = sources.flatMap((_, i) =>
      [0, 0.33, 0.66].map((offset) => ({
        srcIdx: i,
        t: offset + Math.random() * 0.15,
        speed: 0.0028 + Math.random() * 0.0015,
        opacity: 0,
      }))
    )

    let rafId = 0
    let frame = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      // Draw path lines
      sources.forEach((s, i) => {
        const { cp1, cp2 } = cps[i]
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, hub.x, hub.y)
        ctx.strokeStyle = `rgba(${hexToRgb(s.color)}, 0.12)`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Output lines from hub
      const outputs = [
        { x: W * 0.86, y: H * 0.30, label: 'Tableau' },
        { x: W * 0.86, y: H * 0.50, label: 'Looker' },
        { x: W * 0.86, y: H * 0.70, label: 'Redshift' },
      ]
      outputs.forEach((o) => {
        ctx.beginPath()
        ctx.moveTo(hub.x, hub.y)
        ctx.bezierCurveTo(hub.x + 40, hub.y, o.x - 40, o.y, o.x, o.y)
        ctx.strokeStyle = 'rgba(196, 98, 45, 0.18)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Output node
        ctx.beginPath()
        ctx.arc(o.x, o.y, 7, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(196, 98, 45, 0.1)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(196, 98, 45, 0.35)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Destination label (below circle, same style as source labels)
        ctx.fillStyle = 'rgba(114, 112, 106, 0.75)'
        ctx.font = '11px DM Mono, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(o.label, o.x, o.y + 11)
      })

      // Animate particles
      particles.forEach((p) => {
        p.t += p.speed
        if (p.t > 1) p.t -= 1

        // Fade in near start, fade out near end
        if (p.t < 0.1) p.opacity = p.t / 0.1
        else if (p.t > 0.85) p.opacity = (1 - p.t) / 0.15
        else p.opacity = 1.0

        const s   = sources[p.srcIdx]
        const { cp1, cp2 } = cps[p.srcIdx]
        const pos = cubicBezier(s, cp1, cp2, hub, p.t)

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(s.color)}, ${(p.opacity * 0.9).toFixed(2)})`
        ctx.fill()
      })

      // Output particles (flowing out from hub)
      outputs.forEach((o, oi) => {
        const t = ((frame * 0.003 + oi * 0.33) % 1)
        const fade = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1
        const pos = cubicBezier(
          hub,
          { x: hub.x + 40, y: hub.y },
          { x: o.x - 40, y: o.y },
          o,
          t
        )
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 98, 45, ${(fade * 0.8).toFixed(2)})`
        ctx.fill()
      })

      // Draw source nodes
      sources.forEach((s, i) => {
        // Glow
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 22)
        grd.addColorStop(0, `rgba(${hexToRgb(s.color)}, 0.15)`)
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(s.x, s.y, 22, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Circle
        ctx.beginPath()
        ctx.arc(s.x, s.y, 14, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(s.color)}, 0.12)`
        ctx.fill()
        ctx.strokeStyle = `rgba(${hexToRgb(s.color)}, 0.45)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Abbreviation
        ctx.fillStyle = s.color
        ctx.font = '600 11px DM Mono, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(labels[i].slice(0, 2).toUpperCase(), s.x, s.y)

        // Label below
        ctx.fillStyle = 'rgba(114, 112, 106, 0.7)'
        ctx.font = '11px DM Mono, monospace'
        ctx.fillText(labels[i], s.x, s.y + 24)
      })

      // Hub glow rings
      const ringScale1 = 1 + ((frame * 0.008) % 0.9)
      const ringScale2 = 1 + (((frame * 0.008) + 0.45) % 0.9)
      const rAlpha1 = Math.max(0, 0.5 - ((frame * 0.008) % 0.9) / 0.9 * 0.5)
      const rAlpha2 = Math.max(0, 0.5 - (((frame * 0.008) + 0.45) % 0.9) / 0.9 * 0.5)

      ;[
        [ringScale1, rAlpha1],
        [ringScale2, rAlpha2],
      ].forEach(([scale, alpha]) => {
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, 32 * scale, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(196, 98, 45, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Hub circle
      const hubGrd = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 32)
      hubGrd.addColorStop(0, 'rgba(196, 98, 45, 0.22)')
      hubGrd.addColorStop(1, 'rgba(196, 98, 45, 0.04)')
      ctx.beginPath()
      ctx.arc(hub.x, hub.y, 32, 0, Math.PI * 2)
      ctx.fillStyle = hubGrd
      ctx.fill()
      ctx.strokeStyle = 'rgba(196, 98, 45, 0.7)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.fillStyle = '#EDE9E0'
      ctx.font = 'bold 13px Syne, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('S', hub.x, hub.y)

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={ref}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

/* ── Component ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="relative pt-[clamp(100px,12vh,180px)] pb-[clamp(60px,8vh,100px)]">
        {/* Background orb — wrapped so it doesn't clip text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px]"
            style={{
              background:
                'radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-accent border border-accent/30 px-3 py-1.5 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                Now in private beta
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.1 }}
                className="display-heading text-[clamp(42px,5.5vw,72px)] mb-6" style={{ lineHeight: 1.0 }}
              >
                Ship <em className="serif-em text-accent-lt">data</em>
                <br />like you ship
                <br />code.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[17px] text-muted font-light leading-[1.7] max-w-[460px] mb-10"
              >
                Stratum gives data teams{' '}
                <strong className="text-tx font-normal">
                  version control, CI/CD, and observability
                </strong>{' '}
                for their pipelines. Stop debugging in production.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                >
                  Get early access →
                </button>
                <a href="#product" className="btn-ghost">
                  See how it works
                </a>
              </motion.div>
            </div>

            {/* Right — canvas animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block relative"
            >
              <div
                className="relative rounded-2xl border border-border overflow-hidden h-[360px] sm:h-[400px] lg:h-[min(420px,46vh)]"
                style={{
                  background: 'rgba(20,21,18,0.6)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                {/* Top bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/60">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="font-mono text-[11px] text-dim mx-auto">
                    stratum — data flow
                  </span>
                </div>
                <div className="absolute inset-0 top-[41px]">
                  <HeroCanvas />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTAModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
