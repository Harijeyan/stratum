'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CTAModal from './CTAModal'

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-[18px] transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-[14px] border-b border-border'
            : ''
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex flex-col gap-[3.5px]">
              <span className="block h-[2px] bg-accent rounded-sm transition-all duration-300 w-[22px] group-hover:w-[10px]" />
              <span className="block h-[2px] bg-accent rounded-sm w-[16px]" />
              <span className="block h-[2px] bg-accent rounded-sm transition-all duration-300 w-[10px] group-hover:w-[22px]" />
            </div>
            <span className="font-heading font-bold text-[17px] tracking-[-0.01em] text-tx">
              Stratum
            </span>
          </Link>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-9 list-none">
            {[
              { label: 'Product',  href: '#product' },
              { label: 'Features', href: '#features' },
              { label: 'Pricing',  href: '#pricing' },
              { label: 'Work',     href: '/work' },
              { label: 'About',    href: '/about' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="nav-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-[13px] !px-5 !py-2.5"
          >
            Get early access ↗
          </button>
        </div>
      </nav>

      <CTAModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
