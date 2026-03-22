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

type SourceDef = {
  label: string
  abbr: string
  color: string
  status: 'ok' | 'warn'
  records: string
  syncTime: string
  progress: number
}

const SOURCES: SourceDef[] = [
  { label: 'PostgreSQL', abbr: 'PG', color: '#336791', status: 'ok',   records: '12,847 rows',  syncTime: '2m ago',  progress: 82 },
  { label: 'Snowflake',  abbr: 'SF', color: '#29B5E8', status: 'ok',   records: '2.1M rows',    syncTime: '4s ago',  progress: 100 },
  { label: 'BigQuery',   abbr: 'BQ', color: '#4285F4', status: 'ok',   records: '4.5M events',  syncTime: '1m ago',  progress: 91 },
  { label: 'Amazon S3',  abbr: 'S3', color: '#FF9900', status: 'ok',   records: '892 files',    syncTime: '8s ago',  progress: 75 },
  { label: 'Kafka',      abbr: 'KF', color: '#AA2200', status: 'warn', records: '847 ev/s',     syncTime: 'live',    progress: 68 },
  { label: 'MongoDB',    abbr: 'MG', color: '#47A248', status: 'ok',   records: '23.4K docs',   syncTime: '5m ago',  progress: 88 },
]

const DESTINATIONS = [
  { label: 'Dashboards', icon: '◈', desc: '3 connected' },
  { label: 'Alerts',     icon: '◉', desc: '12 rules active' },
  { label: 'Data Catalog', icon: '◎', desc: '847 assets indexed' },
]

function SourceCard({ label, abbr, color, status, records, syncTime, progress }: SourceDef) {
  return (
    <div className="bg-s2 border border-border rounded-xl p-4 relative overflow-hidden group">
      {/* Colored top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
        style={{ background: color }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}35` }}
          >
            <span className="font-mono text-[9px] font-bold" style={{ color }}>
              {abbr}
            </span>
          </div>
          <span className="font-mono text-[11px] text-tx">{label}</span>
        </div>
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            status === 'ok' ? 'bg-g-green animate-status' : 'bg-g-amber animate-status-warn'
          }`}
          style={
            status === 'ok'
              ? { boxShadow: '0 0 6px #4DAF7C' }
              : { boxShadow: '0 0 6px #D4A23A' }
          }
        />
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10px] text-tx">{records}</span>
        <span className="font-mono text-[10px] text-dim">{syncTime}</span>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${progress}%`, background: color, opacity: 0.55 }}
        />
      </div>
    </div>
  )
}

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

        {/* Visualization — integration status board */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-border overflow-hidden bg-surface"
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.45)' }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(196,98,45,0.5), transparent)',
            }}
          />

          {/* Card top bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-s2/60">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-mono text-[10px] text-dim mx-auto">
              stratum — integration status
            </span>
            <span className="font-mono text-[10px] text-g-green bg-g-green/10 border border-g-green/20 px-2 py-0.5 rounded-full">
              ● 6 sources active
            </span>
          </div>

          <div className="p-6 pb-5">
            {/* Source section label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-dim uppercase tracking-[0.1em]">
                Sources
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Source cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {SOURCES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                >
                  <SourceCard {...s} />
                </motion.div>
              ))}
            </div>

            {/* Connector — via Stratum */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border/60" />
              <div className="flex items-center gap-2.5 border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                <span className="font-mono text-[10px] text-accent tracking-[0.08em] uppercase">
                  via Stratum
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              </div>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* Destination section label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-dim uppercase tracking-[0.1em]">
                Destinations
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Destination cards */}
            <div className="grid grid-cols-3 gap-3">
              {DESTINATIONS.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
                  className="bg-s2 border border-border/70 rounded-xl p-4 flex items-center gap-3"
                >
                  <span className="text-accent text-[18px] flex-shrink-0">{d.icon}</span>
                  <div>
                    <div className="font-mono text-[11px] text-tx leading-snug">{d.label}</div>
                    <div className="font-mono text-[10px] text-dim mt-0.5">{d.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
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
