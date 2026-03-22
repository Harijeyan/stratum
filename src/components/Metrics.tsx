'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { target: 40, suffix: '%', label: 'fewer data incidents\nin the first 30 days' },
  { target: 3,  suffix: '×', label: 'faster pipeline\ndeployments' },
  { target: 2,  suffix: 'hr', label: 'saved per engineer\nper week, on average' },
  { target: 200, suffix: '+', label: 'teams in\nprivate beta' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    function update(ts: number) {
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setValue(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [inView, target])

  return (
    <span ref={ref} className="counter-value font-heading font-extrabold tracking-[-0.04em] leading-none text-tx" style={{ fontSize: 'clamp(38px,5vw,60px)' }}>
      {value}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

export default function Metrics() {
  return (
    <div className="bg-surface border-y border-border">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {stats.map((s) => (
            <div key={s.label} className="px-10 py-14 text-center">
              <Counter target={s.target} suffix={s.suffix} />
              <p className="font-sans text-[13px] text-muted font-light leading-[1.55] mt-2.5 whitespace-pre-line">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
