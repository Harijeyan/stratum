'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    name: 'Schema change detection',
    desc: 'Catch column additions, renames, type changes, and removals the moment they happen — before your downstream models fail silently.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>
    ),
    name: 'Pipeline versioning',
    desc: 'Every change to your DAGs and dbt models is versioned like code. Diff two runs side by side. Roll back with one command.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    name: 'Environment promotion',
    desc: 'Move changes from dev → staging → production with automated test gates. No more "works on my machine" pipeline deployments.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    name: 'Freshness monitoring',
    desc: 'Set SLAs for how fresh each table should be. Get paged before your stakeholders notice the dashboard is out of date.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z M15.5 14l2 2 4-4"/>
      </svg>
    ),
    name: 'Lineage visualization',
    desc: 'See exactly how data flows from source to serving layer. Click any node to trace its dependencies and downstream consumers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-lt" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    ),
    name: 'Smart alerting',
    desc: 'Route alerts based on who owns each pipeline. Connects to Slack, PagerDuty, and your existing incident workflow.',
  },
]

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" id="features" ref={ref}>
      <div className="container-main">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <motion.span initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-tag">
              Features
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="display-heading text-[clamp(28px,3.5vw,48px)]">
              Everything your
              <br />
              <em className="serif-em text-muted">pipelines deserve.</em>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }} className="text-[16px] text-muted font-light leading-[1.7]">
            Built by data engineers who got tired of being the last to know when something breaks.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.07 }}
              className="group bg-surface hover:bg-s2 transition-colors duration-200 p-9"
            >
              <div className="w-10 h-10 rounded-[9px] border border-border2 bg-s2 flex items-center justify-center mb-5 transition-colors duration-200 group-hover:border-accent/40 group-hover:bg-accent/5">
                {f.icon}
              </div>
              <h3 className="font-heading font-bold text-[16px] tracking-[-0.01em] mb-2.5 overflow-visible">
                {f.name}
              </h3>
              <p className="text-[13.5px] text-muted font-light leading-[1.65]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
