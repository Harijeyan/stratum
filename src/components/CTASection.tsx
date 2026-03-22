'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const BLOCKED = ['gmail.com','yahoo.com','hotmail.com','outlook.com','icloud.com','aol.com','protonmail.com','live.com']

export default function CTASection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate(val: string): string {
    if (!val.trim()) return 'Enter your work email.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'That doesn\'t look like a valid email.'
    const domain = val.split('@')[1]?.toLowerCase()
    if (BLOCKED.includes(domain)) return 'Please use your work email.'
    return ''
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate(email)
    if (err) { setError(err); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  return (
    <section className="section-pad relative overflow-hidden" id="cta" ref={ref}>
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(196,98,45,0.1) 0%, transparent 65%)',
        }}
      />

      <div className="container-main">
        <div className="text-center max-w-[580px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-[clamp(32px,5vw,62px)] mb-5"
          >
            Stop flying blind.{' '}
            <em className="serif-em text-accent-lt">Start shipping data</em>{' '}
            with confidence.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="text-[17px] text-muted font-light leading-[1.7] mb-10"
          >
            Join 200+ data teams who caught their first silent pipeline failure
            in their first week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-g-green/10 border border-g-green/30 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-g-green" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-heading font-bold text-[17px] text-tx overflow-visible">You&apos;re on the list.</p>
                  <p className="font-mono text-[11px] text-dim">We&apos;ll be in touch within 48 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex w-full max-w-[420px] gap-2.5">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(validate(e.target.value))
                        }}
                        onBlur={() => setError(validate(email))}
                        placeholder="you@company.com"
                        aria-label="Work email"
                        className={`field-input ${error ? 'error' : ''}`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn-primary whitespace-nowrap flex-shrink-0 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>
                      ) : 'Join waitlist'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="field-error"
                        role="alert"
                      >
                        {error}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <p className="font-mono text-[10.5px] text-dim mt-1">
                    No credit card. No spam. Onboarding in under 10 minutes.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
