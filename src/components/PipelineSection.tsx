'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LAYERS = [
  { key: 'raw',    label: 'raw',    name: 'raw_events',    status: 'ok',   opacity: '0.15', delay: '0s' },
  { key: 'stage',  label: 'staging', name: 'stg_events',  status: 'ok',   opacity: '0.22', delay: '0.35s' },
  { key: 'mart',   label: 'marts',   name: 'dim_users',   status: 'warn', opacity: '0.30', delay: '0.7s' },
  { key: 'serve',  label: 'serving', name: 'fct_sessions', status: 'ok',  opacity: '0.38', delay: '1.05s' },
]

function LayerBar({ label, name, status, opacity, delay }: Omit<typeof LAYERS[0], 'key'>) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <span className="font-mono text-[11px] text-dim w-16 text-right flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-9 bg-s2 border border-border rounded-md overflow-hidden relative">
        <div
          className="h-full rounded-md flex items-center pl-3 relative overflow-hidden"
          style={{ background: `rgba(196, 98, 45, ${opacity})` }}
        >
          {/* shimmer */}
          <span
            className="absolute top-0 h-full w-[55%] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              animation: `shimmer-sweep 2.8s ease-in-out ${delay} infinite`,
              left: '-100%',
            }}
          />
          <span className="font-mono text-[11px] text-muted relative z-10 leading-none">
            {name}
          </span>
          <span
            className={`ml-auto mr-3 w-[7px] h-[7px] rounded-full relative z-10 ${
              status === 'ok' ? 'bg-g-green animate-status' : 'bg-g-amber animate-status-warn'
            }`}
            style={
              status === 'ok'
                ? { boxShadow: '0 0 6px #4DAF7C' }
                : { boxShadow: '0 0 6px #D4A23A' }
            }
          />
        </div>
      </div>
    </div>
  )
}

function Connector({ delay }: { delay: string }) {
  return (
    <div className="flex items-center mb-2.5 ml-[76px]">
      <div className="flex-1 h-[1px] bg-border2 relative overflow-visible">
        {[0, 0.7, 1.4].map((offset, i) => (
          <span
            key={i}
            className="absolute top-[-2.5px] w-[5px] h-[5px] rounded-full bg-accent"
            style={{
              animation: `flow 2.2s linear ${parseFloat(delay) + offset}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-tag"
            >
              Live monitoring
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="display-heading text-[clamp(28px,3.5vw,46px)] mb-6"
            >
              See exactly what's
              <br />
              <em className="serif-em text-muted">happening right now.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-[16px] text-muted font-light leading-[1.75] mb-8"
            >
              Every pipeline run is tracked layer by layer — raw ingestion all the
              way through to your served data. If something changes or slows down,
              you see it here first. Not in a Slack message two hours later.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                'Each layer has its own health status — green means good, amber means look closer',
                'Schema drift shows up as a warning before your downstream models break',
                'Run history lets you compare today to any point in the past',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-muted font-light leading-[1.6]">
                  <span className="mt-1.5 w-3.5 h-3.5 flex-shrink-0 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-accent block" />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — pipeline card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="bg-surface border border-border rounded-2xl overflow-hidden relative"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(196,98,45,0.5), transparent)',
                }}
              />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[11px] text-dim tracking-[0.08em] uppercase">
                    analytics_pipeline
                  </span>
                  <span className="font-mono text-[11px] text-g-green bg-g-green/10 border border-g-green/20 px-2.5 py-1 rounded-full">
                    ● production
                  </span>
                </div>

                {/* Layers */}
                {LAYERS.map((layer, i) => (
                  <div key={layer.key}>
                    <LayerBar {...layer} />
                    {i < LAYERS.length - 1 && <Connector delay={`${i * 0.4}s`} />}
                  </div>
                ))}

                {/* Footer */}
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
                  <span className="font-mono text-[11px] text-dim">
                    Last run: <span className="text-g-green">2m ago</span> · 847ms
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-g-amber bg-g-amber/10 border border-g-amber/20 px-2.5 py-1 rounded-full">
                    <span>⚠</span> schema drift detected
                  </span>
                </div>
              </div>
            </div>

            {/* Hover card below */}
            <div className="mt-3 bg-s2 border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-g-amber/10 border border-g-amber/25 flex items-center justify-center flex-shrink-0">
                <span className="text-g-amber text-[13px]">⚠</span>
              </div>
              <div>
                <p className="font-mono text-[11px] text-tx leading-snug">
                  dim_users: column <code className="text-accent">user_segment</code> was removed upstream
                </p>
                <p className="font-mono text-[11px] text-dim mt-0.5">
                  detected 4 minutes ago · 2 models affected
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* keyframes live in globals.css — flow, shimmer-sweep */}
    </section>
  )
}
