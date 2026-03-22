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

/* ── Chrome window shell ── */
function ChromeWindow({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden border border-border"
      style={{
        background: 'rgba(18,19,16,0.97)',
        boxShadow: '0 28px 64px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.45)',
      }}
    >
      {/* Chrome top bar */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border bg-s2/90">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center gap-1.5 bg-bg/70 border border-border rounded-md px-2.5 py-[3px] min-w-0">
          <span className="font-mono text-[9px] text-g-green flex-shrink-0">●</span>
          <span className="font-mono text-[10px] text-dim truncate">{url}</span>
        </div>
        {/* Nav buttons placeholder */}
        <div className="flex gap-1 flex-shrink-0">
          <div className="w-5 h-5 rounded bg-border/60" />
          <div className="w-5 h-5 rounded bg-border/60" />
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Dashboard 1: Analytics Overview ── */
const BARS = [38, 52, 44, 68, 50, 63, 57, 71, 60, 78, 66, 84, 72, 92]

function AnalyticsDashboard() {
  const kpis = [
    { label: 'Total Events', value: '4.2M',  delta: '+12%', pos: true },
    { label: 'Avg Latency',  value: '14ms',  delta: '−3%',  pos: false },
    { label: 'Pipelines',    value: '8',      delta: 'active', pos: true },
    { label: 'Error Rate',   value: '0.02%', delta: 'stable', pos: true },
  ]
  return (
    <div className="p-4">
      {/* Sub-header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-mono text-[10px] text-dim uppercase tracking-[0.08em]">
          Overview · Last 30 days
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-dim border border-border px-2 py-0.5 rounded-md">
            Filter ▾
          </span>
          <span className="font-mono text-[9px] text-dim border border-border px-2 py-0.5 rounded-md">
            Export ↓
          </span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-s2 border border-border rounded-lg p-2.5">
            <div className="font-mono text-[9px] text-dim mb-1.5 leading-tight">{k.label}</div>
            <div className="font-mono text-[14px] text-tx font-semibold leading-none mb-1">{k.value}</div>
            <div
              className="font-mono text-[9px]"
              style={{ color: k.pos ? '#4DAF7C' : '#D4A23A' }}
            >
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-s2 border border-border rounded-lg p-3">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[9px] text-dim">Events / day</span>
          <span className="font-mono text-[9px] text-accent">↑ trending up</span>
        </div>
        <div className="flex items-end gap-[3px] h-[54px]">
          {BARS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all"
              style={{
                height: `${h}%`,
                background:
                  i === BARS.length - 1
                    ? '#C4622D'
                    : `rgba(196,98,45,${0.14 + (h / 100) * 0.3})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-mono text-[8px] text-dim">Mar 8</span>
          <span className="font-mono text-[8px] text-dim">Mar 22</span>
        </div>
      </div>

      <div className="mt-2 font-mono text-[9px] text-dim text-right">
        Updated 4s ago · auto-refresh on
      </div>
    </div>
  )
}

/* ── Dashboard 2: Pipeline Health ── */
function PipelineDashboard() {
  const pipes = [
    { name: 'analytics_pipeline', status: 'ok',   dur: '847ms', rows: '2.1M',  pct: 100 },
    { name: 'user_activity_etl',  status: 'ok',   dur: '1.2s',  rows: '423K',  pct: 88  },
    { name: 'revenue_transform',  status: 'warn', dur: '3.4s',  rows: '88K',   pct: 62  },
    { name: 'dim_users_refresh',  status: 'ok',   dur: '290ms', rows: '12K',   pct: 95  },
    { name: 'fct_sessions_daily', status: 'ok',   dur: '560ms', rows: '340K',  pct: 79  },
  ]
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-mono text-[10px] text-dim uppercase tracking-[0.08em]">
          Pipelines — production
        </span>
        <span className="font-mono text-[9px] text-g-green bg-g-green/10 border border-g-green/20 px-2 py-0.5 rounded-full">
          ● 8 running
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_44px_52px_44px] gap-x-2 px-2.5 mb-1.5">
        {['Name', 'Status', 'Dur', 'Rows'].map((h) => (
          <span key={h} className="font-mono text-[8px] text-dim uppercase tracking-[0.08em]">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-1.5">
        {pipes.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[1fr_44px_52px_44px] gap-x-2 bg-s2 border border-border rounded-lg px-2.5 py-2 items-center"
          >
            <span className="font-mono text-[10px] text-tx truncate">{p.name}</span>
            <div className="flex items-center gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: p.status === 'ok' ? '#4DAF7C' : '#D4A23A',
                  boxShadow: `0 0 5px ${p.status === 'ok' ? '#4DAF7C' : '#D4A23A'}`,
                }}
              />
              <span
                className="font-mono text-[9px]"
                style={{ color: p.status === 'ok' ? '#4DAF7C' : '#D4A23A' }}
              >
                {p.status}
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted">{p.dur}</span>
            <span className="font-mono text-[10px] text-muted">{p.rows}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-border">
        <span className="font-mono text-[9px] text-dim">Next run in 12m</span>
        <span className="font-mono text-[9px] text-g-amber">⚠ 1 warning · 0 errors</span>
      </div>
    </div>
  )
}

/* ── Dashboard 3: Data Quality ── */
const CIRC = 2 * Math.PI * 16  // 100.53

function QualityDashboard() {
  const score = 96
  const dims = [
    { label: 'Completeness', pct: 94 },
    { label: 'Freshness',    pct: 99 },
    { label: 'Accuracy',     pct: 91 },
    { label: 'Consistency',  pct: 96 },
  ]
  const checks = [
    { model: 'dim_users',    result: 'ok',   note: 'passed',       ago: '2m ago' },
    { model: 'fct_sessions', result: 'ok',   note: 'passed',       ago: '4m ago' },
    { model: 'raw_events',   result: 'warn', note: 'schema drift', ago: '8m ago' },
  ]
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-mono text-[10px] text-dim uppercase tracking-[0.08em]">
          Data Quality · production
        </span>
        <span className="font-mono text-[9px] text-dim border border-border px-2 py-0.5 rounded-md">
          Full report →
        </span>
      </div>

      {/* Score + ring */}
      <div className="flex items-center gap-5 mb-4">
        <div className="relative flex-shrink-0 w-14 h-14">
          <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="rgba(196,98,45,0.15)"
              strokeWidth="3"
            />
            <circle
              cx="20" cy="20" r="16"
              fill="none"
              stroke="#C4622D"
              strokeWidth="3"
              strokeDasharray={`${(score / 100) * CIRC} ${CIRC}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[13px] text-tx font-semibold">
            {score}
          </span>
        </div>
        <div>
          <div className="font-mono text-[11px] text-tx mb-0.5">Overall Score</div>
          <div className="font-mono text-[9px] text-g-green">↑ 2 pts from last week</div>
          <div className="font-mono text-[9px] text-dim mt-0.5">847 assets checked</div>
        </div>
      </div>

      {/* Dimension bars */}
      <div className="space-y-2 mb-3.5">
        {dims.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-dim w-[78px] flex-shrink-0 truncate">
              {d.label}
            </span>
            <div className="flex-1 h-[5px] bg-s2 border border-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${d.pct}%`, background: '#C4622D', opacity: 0.72 }}
              />
            </div>
            <span className="font-mono text-[9px] text-muted w-7 text-right flex-shrink-0">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>

      {/* Recent checks */}
      <div className="border-t border-border pt-2.5 space-y-1.5">
        {checks.map((c) => (
          <div key={c.model} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="font-mono text-[9px] flex-shrink-0"
                style={{ color: c.result === 'ok' ? '#4DAF7C' : '#D4A23A' }}
              >
                {c.result === 'ok' ? '✓' : '⚠'}
              </span>
              <span className="font-mono text-[10px] text-tx">{c.model}</span>
              <span className="font-mono text-[9px] text-dim">— {c.note}</span>
            </div>
            <span className="font-mono text-[9px] text-dim flex-shrink-0">{c.ago}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Section ── */
export default function DataSourcesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" id="product" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-20">
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

        {/* Overlapping browser windows — pyramid layout */}
        <div
          className="relative h-[430px] sm:h-[450px] lg:h-[460px] mb-16"
          style={{ overflow: 'visible' }}
        >
          {/* Window 1 — Analytics Overview (back-left, peeks from left) */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: -5 }}
            animate={inView ? { opacity: 0.82, y: 0, rotate: -5 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 70,
              left: 0,
              width: '58%',
              transformOrigin: '50% 100%',
              zIndex: 10,
            }}
          >
            <ChromeWindow url="analytics.stratum.io/overview">
              <AnalyticsDashboard />
            </ChromeWindow>
          </motion.div>

          {/* Window 3 — Data Quality (back-right, peeks from right) */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: 4 }}
            animate={inView ? { opacity: 0.88, y: 0, rotate: 4 } : {}}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 50,
              right: 0,
              width: '58%',
              transformOrigin: '50% 100%',
              zIndex: 20,
            }}
          >
            <ChromeWindow url="app.stratum.io/quality">
              <QualityDashboard />
            </ChromeWindow>
          </motion.div>

          {/* Window 2 — Pipeline Health (center-front, hero window) */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: -1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: -1 } : {}}
            transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 10,
              left: '21%',
              width: '58%',
              transformOrigin: '50% 100%',
              zIndex: 30,
            }}
          >
            <ChromeWindow url="app.stratum.io/pipelines">
              <PipelineDashboard />
            </ChromeWindow>
          </motion.div>
        </div>

        {/* Integration tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {['dbt', 'Airflow', 'Snowflake', 'BigQuery', 'Redshift', 'PostgreSQL', 'Kafka', 'MongoDB', 'Amazon S3', 'Fivetran'].map(
            (tool) => (
              <span
                key={tool}
                className="font-mono text-[11px] text-muted border border-border px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            )
          )}
          <span className="font-mono text-[11px] text-dim px-3 py-1">
            + more on the way
          </span>
        </motion.div>
      </div>
    </section>
  )
}
