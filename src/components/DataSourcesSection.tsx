'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Source node data ── */
type SourceDef = {
  cx: number
  cy: number
  label: string
  abbr: string
  color: string
  pathId: string
  path: string
  dur: string
  beginOffsets: string[]
}

const SOURCES: SourceDef[] = [
  {
    cx: 78, cy: 92, label: 'PostgreSQL', abbr: 'PG', color: '#336791',
    pathId: 'sp0',
    path: 'M78,92 C190,92 370,210 468,238',
    dur: '3.0s', beginOffsets: ['0s', '-1.5s'],
  },
  {
    cx: 78, cy: 238, label: 'Snowflake', abbr: 'SF', color: '#29B5E8',
    pathId: 'sp1',
    path: 'M78,238 C220,238 348,238 468,238',
    dur: '2.6s', beginOffsets: ['0s', '-1.3s'],
  },
  {
    cx: 78, cy: 384, label: 'BigQuery', abbr: 'BQ', color: '#4285F4',
    pathId: 'sp2',
    path: 'M78,384 C190,384 370,265 468,238',
    dur: '3.2s', beginOffsets: ['0s', '-1.6s'],
  },
  {
    cx: 228, cy: 138, label: 'Amazon S3', abbr: 'S3', color: '#FF9900',
    pathId: 'sp3',
    path: 'M228,138 C320,138 415,205 468,238',
    dur: '2.4s', beginOffsets: ['0s', '-1.2s'],
  },
  {
    cx: 228, cy: 238, label: 'Kafka', abbr: 'KF', color: '#231F20',
    pathId: 'sp4',
    path: 'M228,238 C320,238 410,238 468,238',
    dur: '2.2s', beginOffsets: ['0s', '-1.1s'],
  },
  {
    cx: 228, cy: 338, label: 'MongoDB', abbr: 'MG', color: '#47A248',
    pathId: 'sp5',
    path: 'M228,338 C320,338 415,272 468,238',
    dur: '2.8s', beginOffsets: ['0s', '-1.4s'],
  },
]

const OUTPUT_NODES = [
  { cx: 660, cy: 158, label: 'Dashboards',   icon: '◈' },
  { cx: 660, cy: 238, label: 'Alerts',       icon: '◉' },
  { cx: 660, cy: 318, label: 'Data Catalog', icon: '◎' },
]

const OUTPUT_PATHS = [
  { id: 'op0', d: 'M530,238 C575,230 625,185 660,158', dur: '2.2s' },
  { id: 'op1', d: 'M530,238 C575,238 625,238 660,238', dur: '2.0s' },
  { id: 'op2', d: 'M530,238 C575,246 625,290 660,318', dur: '2.2s' },
]

export default function DataSourcesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" id="product" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-16">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-tag"
          >
            Integrations
          </motion.span>
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="display-heading text-[clamp(30px,3.8vw,50px)]"
          >
            All your data sources.
            <br />
            <em className="serif-em text-muted">One pipeline.</em>
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-[16px] text-muted font-light leading-[1.7] mt-5"
          >
            Connect Stratum to the tools you already use. It reads from your databases,
            warehouses, and streams — without changing how you work.
          </motion.p>
        </div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-border overflow-hidden bg-surface"
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.45)' }}
        >
          {/* Card top bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-s2/60">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-mono text-[10px] text-dim mx-auto">
              stratum — live connections
            </span>
            <span className="font-mono text-[10px] text-g-green bg-g-green/10 border border-g-green/20 px-2 py-0.5 rounded-full">
              ● 6 sources active
            </span>
          </div>

          {/* SVG */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 760 476"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Hub glow filter */}
                <filter id="hub-glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>

                {/* Gradient for path lines — source color fading to accent */}
                {SOURCES.map((s) => (
                  <linearGradient key={s.pathId + '-lg'} id={s.pathId + '-lg'} gradientUnits="userSpaceOnUse"
                    x1={s.cx} y1={s.cy} x2="499" y2="238">
                    <stop offset="0%"   stopColor={s.color}   stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C4622D" stopOpacity="0.2" />
                  </linearGradient>
                ))}
              </defs>

              {/* ── Connection paths ── */}
              {SOURCES.map((s) => (
                <path
                  key={s.pathId}
                  id={s.pathId}
                  d={s.path}
                  fill="none"
                  stroke={`url(#${s.pathId}-lg)`}
                  strokeWidth="1"
                />
              ))}

              {/* ── Animated dots on input paths ── */}
              {SOURCES.map((s) =>
                s.beginOffsets.map((begin, j) => (
                  <g key={`${s.pathId}-dot-${j}`}>
                    {/* Glow copy */}
                    <circle r="4" fill={s.color} opacity="0.3" filter="url(#dot-glow)">
                      <animateMotion dur={s.dur} repeatCount="indefinite" begin={begin}>
                        <mpath href={`#${s.pathId}`} />
                      </animateMotion>
                      <animate attributeName="opacity"
                        values="0;0.3;0.3;0"
                        keyTimes="0;0.08;0.88;1"
                        dur={s.dur} repeatCount="indefinite" begin={begin} />
                    </circle>
                    {/* Core dot */}
                    <circle r="2.2" fill={s.color}>
                      <animateMotion dur={s.dur} repeatCount="indefinite" begin={begin}>
                        <mpath href={`#${s.pathId}`} />
                      </animateMotion>
                      <animate attributeName="opacity"
                        values="0;0.9;0.9;0"
                        keyTimes="0;0.08;0.88;1"
                        dur={s.dur} repeatCount="indefinite" begin={begin} />
                    </circle>
                  </g>
                ))
              )}

              {/* ── Output paths ── */}
              {OUTPUT_PATHS.map((op) => (
                <path key={op.id} id={op.id} d={op.d} fill="none"
                  stroke="#C4622D" strokeWidth="1" opacity="0.18" />
              ))}

              {/* ── Output dots ── */}
              {OUTPUT_PATHS.map((op, i) => (
                [0, 0.5].map((offset) => (
                  <g key={`${op.id}-dot-${offset}`}>
                    <circle r="3.5" fill="#C4622D" opacity="0.2" filter="url(#dot-glow)">
                      <animateMotion dur={op.dur} repeatCount="indefinite" begin={`${offset * parseFloat(op.dur)}s`}>
                        <mpath href={`#${op.id}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.2;0.2;0"
                        keyTimes="0;0.1;0.88;1" dur={op.dur} repeatCount="indefinite"
                        begin={`${offset * parseFloat(op.dur)}s`} />
                    </circle>
                    <circle r="1.8" fill="#D9774A">
                      <animateMotion dur={op.dur} repeatCount="indefinite" begin={`${offset * parseFloat(op.dur)}s`}>
                        <mpath href={`#${op.id}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.85;0.85;0"
                        keyTimes="0;0.1;0.88;1" dur={op.dur} repeatCount="indefinite"
                        begin={`${offset * parseFloat(op.dur)}s`} />
                    </circle>
                  </g>
                ))
              ))}

              {/* ── Source nodes ── */}
              {SOURCES.map((s) => (
                <g key={s.label}>
                  {/* Outer glow */}
                  <circle cx={s.cx} cy={s.cy} r="26" fill={s.color} opacity="0.05" />
                  {/* Node circle */}
                  <circle cx={s.cx} cy={s.cy} r="17"
                    fill={s.color} fillOpacity="0.1"
                    stroke={s.color} strokeOpacity="0.45" strokeWidth="1" />
                  {/* Abbreviation */}
                  <text x={s.cx} y={s.cy} textAnchor="middle" dominantBaseline="central"
                    fill={s.color} fontSize="9" fontFamily="DM Mono, monospace" fontWeight="500">
                    {s.abbr}
                  </text>
                  {/* Label */}
                  <text x={s.cx} y={s.cy + 29} textAnchor="middle"
                    fill="#5A5850" fontSize="8.5" fontFamily="DM Mono, monospace">
                    {s.label}
                  </text>
                </g>
              ))}

              {/* ── Hub — Stratum center node ── */}
              {/* Pulse rings */}
              <circle cx="499" cy="238" r="42" fill="none" stroke="#C4622D" strokeWidth="1" opacity="0">
                <animate attributeName="r"      values="42;76"   dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="499" cy="238" r="42" fill="none" stroke="#C4622D" strokeWidth="1" opacity="0">
                <animate attributeName="r"      values="42;76"   dur="2.6s" repeatCount="indefinite" begin="-1.3s" />
                <animate attributeName="opacity" values="0.45;0" dur="2.6s" repeatCount="indefinite" begin="-1.3s" />
              </circle>
              {/* Hub fill */}
              <circle cx="499" cy="238" r="42"
                fill="#C4622D" fillOpacity="0.08"
                stroke="#C4622D" strokeOpacity="0.6" strokeWidth="1.5"
                filter="url(#hub-glow)" />
              <circle cx="499" cy="238" r="30"
                fill="#C4622D" fillOpacity="0.05"
                stroke="#C4622D" strokeOpacity="0.25" strokeWidth="1" />
              {/* S letter */}
              <text x="499" y="238" textAnchor="middle" dominantBaseline="central"
                fill="#EDE9E0" fontSize="16" fontFamily="Syne, sans-serif" fontWeight="700">
                S
              </text>
              {/* "Stratum" label below hub */}
              <text x="499" y="295" textAnchor="middle"
                fill="#72706A" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="0.08em">
                STRATUM
              </text>

              {/* ── Output nodes ── */}
              {OUTPUT_NODES.map((o) => (
                <g key={o.label}>
                  <rect x={o.cx - 42} y={o.cy - 16} width="84" height="32" rx="6"
                    fill="#1B1C18" stroke="#2E2F2A" strokeWidth="1" />
                  <text x={o.cx - 20} y={o.cy} textAnchor="middle" dominantBaseline="central"
                    fill="#C4622D" fontSize="11" fontFamily="sans-serif">
                    {o.icon}
                  </text>
                  <text x={o.cx + 4} y={o.cy} textAnchor="start" dominantBaseline="central"
                    fill="#9A9888" fontSize="8.5" fontFamily="DM Mono, monospace">
                    {o.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-s2/40">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-dim">
                Last sync: <span className="text-g-green">4s ago</span>
              </span>
              <span className="font-mono text-[10px] text-dim">
                Events/sec: <span className="text-tx">2,847</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-dim">
              3 destinations · 0 errors
            </span>
          </div>
        </motion.div>

        {/* Integration tags below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {['dbt', 'Airflow', 'Snowflake', 'BigQuery', 'Redshift', 'PostgreSQL', 'Kafka', 'MongoDB', 'Amazon S3', 'Fivetran'].map((tool) => (
            <span
              key={tool}
              className="font-mono text-[11px] text-muted border border-border px-3 py-1 rounded-full"
            >
              {tool}
            </span>
          ))}
          <span className="font-mono text-[11px] text-dim px-3 py-1">
            + more on the way
          </span>
        </motion.div>
      </div>
    </section>
  )
}
