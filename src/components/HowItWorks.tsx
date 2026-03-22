'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Connect',
    heading: 'Link your stack in minutes',
    body: 'Point Stratum at your dbt project, Airflow DAGs, and data warehouse. It reads your existing config — no rewrites, no migrations, no new agents to manage.',
    badge: 'dbt · Airflow · Snowflake · BigQuery',
  },
  {
    num: '02',
    title: 'Monitor',
    heading: 'Watch every run, automatically',
    body: 'Stratum tracks schema changes, volume drops, and freshness SLA breaches before they reach your stakeholders. Every run is logged and searchable.',
    badge: 'Slack · PagerDuty · email',
  },
  {
    num: '03',
    title: 'Ship',
    heading: 'Promote with confidence',
    body: 'Run tests automatically when moving changes from dev to staging to production. If a check fails, the promotion is blocked. If it passes, you\'re done in one click.',
    badge: 'Git-native · env-aware',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container-main">
        <div className="text-center max-w-[520px] mx-auto mb-14">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-tag">
            How it works
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="display-heading text-[clamp(28px,3.5vw,48px)]">
            Three steps to stop{' '}
            <em className="serif-em text-muted">flying blind.</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
              className="bg-surface hover:bg-s2 transition-colors duration-200 p-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10.5px] text-dim tracking-[0.1em]">
                  {step.num} — {step.title}
                </span>
                <div className="flex-1 h-px bg-border2" />
              </div>
              <h3 className="font-heading font-bold text-[20px] tracking-[-0.02em] mb-3 overflow-visible">
                {step.heading}
              </h3>
              <p className="text-[13.5px] text-muted font-light leading-[1.7] mb-5">
                {step.body}
              </p>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] text-dim border border-border2 px-2.5 py-1.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-g-green" />
                {step.badge}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
