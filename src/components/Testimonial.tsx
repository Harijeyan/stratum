'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section-pad relative" ref={ref}>
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,98,45,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[800px] mx-auto text-center"
        >
          <span
            className="block font-display text-[110px] leading-[0.5] text-accent/20 mb-5 select-none"
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="font-display italic text-[clamp(20px,2.8vw,32px)] leading-[1.5] text-tx mb-10">
            Before Stratum, we found out about pipeline failures when someone in Slack
            sent a screenshot of a broken chart. Now we know before anyone else does.
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-[14px] text-tx flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C4622D, #8B4513)' }}
            >
              SR
            </div>
            <div className="text-left">
              <p className="font-heading font-semibold text-[14px] text-tx">Sarah Reeves</p>
              <p className="text-[13px] text-muted font-light">Head of Data Engineering · Watershed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
