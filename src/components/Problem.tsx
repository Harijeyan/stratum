'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <motion.span custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-tag">
              The problem
            </motion.span>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="display-heading text-[clamp(28px,3.5vw,48px)] mb-6">
              Your pipeline broke.
              <br />
              <em className="serif-em text-muted">You found out from Slack.</em>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-[16px] text-muted font-light leading-[1.75] mb-8">
              Data teams are flying blind. A column gets renamed upstream
              and nobody notices until the revenue dashboard is wrong.
            </motion.p>
            <ul className="divide-y divide-border">
              {[
                { icon: '🔇', text: 'Silent failures show up hours later, after decisions have already been made on wrong numbers.' },
                { icon: '🔍', text: 'No record of what changed or when. Debugging means checking Airflow, then dbt, then your warehouse.' },
                { icon: '🚧', text: 'Promoting pipeline changes from dev to production is manual, risky, and nobody wants to own it.' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={3 + i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex items-start gap-4 py-5 text-[14px] text-muted font-light leading-[1.6]"
                >
                  <span className="w-7 h-7 flex-shrink-0 mt-0.5 rounded-md bg-g-red/10 border border-g-red/20 flex items-center justify-center text-[13px]">
                    {item.icon}
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl overflow-hidden border border-border font-mono text-[12px] leading-[1.8]"
            style={{ background: '#0A0B09', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <span className="text-[11px] text-dim mx-auto">airflow — 03:47 UTC</span>
            </div>
            <div className="p-5 space-y-0">
              <p className="text-[#2A2B25]">──────────────────────────────────</p>
              <p><span className="text-[#5A5850]">DAG:</span> <span className="text-[#9A9888]">analytics_v2 </span><span className="text-[#525249]">▸ </span><span className="text-[#9A9888]">run_id=2024-01-15</span></p>
              <p className="text-[#2A2B25]">──────────────────────────────────</p>
              <p>&nbsp;</p>
              <p><span className="text-[#5A5850]">task:</span> <span className="text-[#9A9888]">stg_events__validate</span></p>
              <p><span className="text-g-red">✗ FAILED</span> <span className="text-[#5A5850]">after 4.2s</span></p>
              <p>&nbsp;</p>
              <p className="text-g-amber">! KeyError: &apos;user_id&apos;</p>
              <p className="text-[#525249]">  expected column not found in</p>
              <p className="text-[#525249]">  raw.events (schema: v3.1.0)</p>
              <p>&nbsp;</p>
              <p className="text-[#5A5850]">downstream tasks:</p>
              <p><span className="text-[#525249]">  dim_users </span><span className="text-g-amber">skipped</span></p>
              <p><span className="text-[#525249]">  fct_sessions </span><span className="text-g-amber">skipped</span></p>
              <p><span className="text-[#525249]">  revenue_daily </span><span className="text-g-red">blocked</span></p>
              <p>&nbsp;</p>
              <p><span className="text-[#5A5850]">$ </span><span className="inline-block w-[7px] h-[13px] bg-accent align-middle animate-blink" /></p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
