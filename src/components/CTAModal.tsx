'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ── */
type FormValues = {
  email:     string
  company:   string
  role:      string
  teamSize:  string
  pipelines: string
}

type FormErrors = Partial<FormValues>

const BLOCKED_DOMAINS = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com',
  'icloud.com','aol.com','protonmail.com','mail.com',
  'live.com','msn.com','ymail.com',
]

const ROLE_OPTIONS = [
  { value: '',                        label: 'Select your role' },
  { value: 'data-engineer',           label: 'Data Engineer' },
  { value: 'data-platform-lead',      label: 'Data Platform Lead' },
  { value: 'analytics-engineer',      label: 'Analytics Engineer' },
  { value: 'data-scientist',          label: 'Data Scientist' },
  { value: 'engineering-manager',     label: 'Engineering Manager' },
  { value: 'cto-vp',                  label: 'CTO / VP Engineering' },
  { value: 'other',                   label: 'Other' },
]

const SIZE_OPTIONS = [
  { value: '',       label: 'Team size' },
  { value: '1-5',    label: '1 – 5 people' },
  { value: '6-20',   label: '6 – 20 people' },
  { value: '21-100', label: '21 – 100 people' },
  { value: '100+',   label: '100+ people' },
]

const PIPELINE_OPTIONS = [
  { value: '',      label: 'Pipelines you manage' },
  { value: '1-5',   label: '1 – 5 pipelines' },
  { value: '6-20',  label: '6 – 20 pipelines' },
  { value: '21-50', label: '21 – 50 pipelines' },
  { value: '50+',   label: '50+ pipelines' },
]

/* ── Validation ── */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.email.trim()) {
    errors.email = 'Work email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  } else {
    const domain = values.email.split('@')[1]?.toLowerCase()
    if (BLOCKED_DOMAINS.includes(domain)) {
      errors.email = 'Please use your work email, not a personal one.'
    }
  }

  if (!values.company.trim()) {
    errors.company = 'Company name is required.'
  } else if (values.company.trim().length < 2) {
    errors.company = 'Company name must be at least 2 characters.'
  }

  if (!values.role)      errors.role      = 'Please select your role.'
  if (!values.teamSize)  errors.teamSize  = 'Please select your team size.'
  if (!values.pipelines) errors.pipelines = 'Please select a pipeline count.'

  return errors
}

/* ── Field components ── */
function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="field-error"
            role="alert"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Success screen ── */
function SuccessScreen({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-8 px-4"
    >
      {/* Check ring */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-g-green/10 border border-g-green/30 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-g-green" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        {/* Ping */}
        <span className="absolute inset-0 rounded-full bg-g-green/10 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      <h3 className="font-heading font-bold text-[22px] tracking-[-0.02em] text-tx mb-2 overflow-visible">
        You&apos;re on the list.
      </h3>
      <p className="text-[14px] text-muted font-light leading-[1.7] max-w-[320px] mb-6">
        We&apos;ll reach out to{' '}
        <strong className="text-tx font-normal">{email}</strong> when your
        spot is ready. Usually within a few days.
      </p>

      <div className="w-full bg-s2 border border-border rounded-xl p-5 text-left space-y-3">
        <p className="font-mono text-[10.5px] text-dim tracking-[0.08em] uppercase mb-1">
          What happens next
        </p>
        {[
          'We review your team size and pipeline setup',
          'A short onboarding call — 20 minutes, no sales pitch',
          'You connect your first pipeline and we are live',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="font-mono text-[11px] text-accent mt-0.5 flex-shrink-0">
              0{i + 1}
            </span>
            <span className="text-[13px] text-muted font-light leading-snug">{step}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Main modal ── */
export default function CTAModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [values, setValues] = useState<FormValues>({
    email: '', company: '', role: '', teamSize: '', pipelines: '',
  })
  const [errors, setErrors]       = useState<FormErrors>({})
  const [touched, setTouched]     = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const firstInputRef             = useRef<HTMLInputElement>(null)

  /* Focus first input when modal opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Validate on change for touched fields */
  function handleChange(key: keyof FormValues, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) {
      const errs = validate(next)
      setErrors((prev) => ({ ...prev, [key]: errs[key] }))
    }
  }

  function handleBlur(key: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const errs = validate(values)
    setErrors((prev) => ({ ...prev, [key]: errs[key] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const allTouched = Object.fromEntries(
      Object.keys(values).map((k) => [k, true])
    ) as Record<keyof FormValues, boolean>
    setTouched(allTouched)

    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    /* Simulate async submit */
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  function handleClose() {
    onClose()
    /* Reset after animation completes */
    setTimeout(() => {
      setValues({ email: '', company: '', role: '', teamSize: '', pipelines: '' })
      setErrors({})
      setTouched({})
      setSubmitted(false)
      setLoading(false)
    }, 300)
  }

  const isValid = Object.keys(validate(values)).length === 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            onClick={handleClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Get early access"
            className="fixed z-[201] inset-0 flex items-center justify-center p-5 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[480px] bg-surface border border-border rounded-2xl overflow-hidden pointer-events-auto"
              style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(196,98,45,0.6), transparent)',
                }}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-tx hover:bg-s2 transition-colors z-10"
                aria-label="Close"
              >
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>

              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <SuccessScreen key="success" email={values.email} />
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Header */}
                      <div className="mb-7">
                        <h2 className="font-heading font-bold text-[22px] tracking-[-0.02em] text-tx mb-1.5 overflow-visible">
                          Get early access
                        </h2>
                        <p className="text-[13.5px] text-muted font-light leading-[1.6]">
                          Tell us a bit about your team and we will set you up.
                          Usually takes less than 48 hours.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} noValidate className="space-y-5">

                        <Field label="Work email *" id="email" error={errors.email}>
                          <input
                            ref={firstInputRef}
                            id="email"
                            type="email"
                            autoComplete="work email"
                            placeholder="you@company.com"
                            value={values.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                            className={`field-input ${errors.email && touched.email ? 'error' : ''}`}
                          />
                        </Field>

                        <Field label="Company name *" id="company" error={errors.company}>
                          <input
                            id="company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Acme Corp"
                            value={values.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            onBlur={() => handleBlur('company')}
                            className={`field-input ${errors.company && touched.company ? 'error' : ''}`}
                          />
                        </Field>

                        <Field label="Your role *" id="role" error={errors.role}>
                          <select
                            id="role"
                            value={values.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            onBlur={() => handleBlur('role')}
                            className={`field-input appearance-none cursor-pointer ${errors.role && touched.role ? 'error' : ''}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2372706A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '36px' }}
                          >
                            {ROLE_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value} disabled={!o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Team size *" id="teamSize" error={errors.teamSize}>
                            <select
                              id="teamSize"
                              value={values.teamSize}
                              onChange={(e) => handleChange('teamSize', e.target.value)}
                              onBlur={() => handleBlur('teamSize')}
                              className={`field-input appearance-none cursor-pointer ${errors.teamSize && touched.teamSize ? 'error' : ''}`}
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2372706A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '36px' }}
                            >
                              {SIZE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value} disabled={!o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </Field>

                          <Field label="Pipelines *" id="pipelines" error={errors.pipelines}>
                            <select
                              id="pipelines"
                              value={values.pipelines}
                              onChange={(e) => handleChange('pipelines', e.target.value)}
                              onBlur={() => handleBlur('pipelines')}
                              className={`field-input appearance-none cursor-pointer ${errors.pipelines && touched.pipelines ? 'error' : ''}`}
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%2372706A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '36px' }}
                            >
                              {PIPELINE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value} disabled={!o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={loading}
                          className={`w-full py-3.5 rounded-lg font-sans font-medium text-[15px] transition-all duration-200 flex items-center justify-center gap-2 mt-2
                            ${loading
                              ? 'bg-accent/50 cursor-not-allowed text-tx/60'
                              : isValid
                                ? 'bg-accent text-tx hover:bg-accent-lt'
                                : 'bg-accent/60 text-tx/80 cursor-not-allowed'
                            }`}
                        >
                          {loading ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                              </svg>
                              Saving your spot…
                            </>
                          ) : (
                            'Request early access →'
                          )}
                        </button>

                        <p className="font-mono text-[10.5px] text-dim text-center">
                          No credit card. We review every request personally.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
