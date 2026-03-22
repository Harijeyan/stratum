'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CTAModal from './CTAModal'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'For small teams getting started with pipeline observability.',
    featured: false,
    cta: 'Get started free',
    features: [
      'Up to 3 pipelines',
      '7-day run history',
      'Slack alerts',
      'Basic schema monitoring',
      '1 environment',
    ],
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/mo',
    desc: 'For growing teams who need full control and faster shipping.',
    featured: true,
    cta: 'Get early access',
    features: [
      'Unlimited pipelines',
      '90-day run history',
      'Slack + PagerDuty + email',
      'Schema drift detection',
      'Dev / staging / production',
      'Lineage visualization',
      'Git-native versioning',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For larger teams with security, SSO, and SLA requirements.',
    featured: false,
    cta: 'Talk to sales',
    features: [
      'Everything in Growth',
      'SSO / SAML',
      'SOC 2 Type II',
      'Priority support + SLA',
      'Custom data retention',
      'Dedicated success engineer',
    ],
  },
]

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [modal, setModal] = useState(false)

  return (
    <>
      <section className="section-pad" id="pricing" ref={ref}>
        <div className="container-main">
          <div className="text-center max-w-[480px] mx-auto mb-14">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="section-tag">
              Pricing
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="display-heading text-[clamp(28px,3.5vw,48px)]">
              Simple. No surprises.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }} className="text-muted font-light mt-4">
              Start free. Scale when you need to.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
                className={`relative rounded-2xl p-8 border transition-colors duration-200 ${
                  plan.featured
                    ? 'border-accent bg-gradient-to-b from-accent/[0.06] to-surface'
                    : 'border-border bg-surface hover:border-border2'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-tx font-mono text-[10px] tracking-[0.08em] uppercase px-3.5 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                )}

                <p className="font-mono text-[11px] font-bold tracking-[0.08em] uppercase text-muted mb-4">
                  {plan.name}
                </p>

                <div className="mb-1">
                  <span className="font-heading font-extrabold tracking-[-0.04em] text-tx leading-none overflow-visible"
                    style={{ fontSize: plan.price === 'Custom' ? '38px' : '46px' }}>
                    {plan.price === 'Free' || plan.price === 'Custom' ? plan.price : (
                      <><sup className="font-normal text-[22px] text-muted align-super">$</sup>{plan.price.slice(1)}</>
                    )}
                  </span>
                  {plan.period && (
                    <span className="text-[14px] text-muted font-light">{plan.period}</span>
                  )}
                </div>

                <p className="text-[13.5px] text-muted font-light leading-[1.6] mt-3 pb-6 mb-6 border-b border-border">
                  {plan.desc}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-muted font-light">
                      <span className="w-3.5 h-3.5 flex-shrink-0 rounded-full bg-g-green/15 border border-g-green/30 flex items-center justify-center text-[9px] text-g-green font-bold">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setModal(true)}
                  className={`w-full py-3 rounded-lg font-sans text-[14px] font-medium transition-all duration-200 ${
                    plan.featured
                      ? 'bg-accent text-tx hover:bg-accent-lt'
                      : 'bg-transparent border border-border2 text-muted hover:border-muted hover:text-tx'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTAModal open={modal} onClose={() => setModal(false)} />
    </>
  )
}
