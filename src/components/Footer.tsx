import Link from 'next/link'

const NAV_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',  href: '#features' },
      { label: 'Pricing',   href: '#pricing' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap',   href: '#' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Documentation',  href: '#' },
      { label: 'API Reference',  href: '#' },
      { label: 'dbt Integration', href: '#' },
      { label: 'Airflow Plugin', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Work',    href: '/work' },
      { label: 'About',   href: '/about' },
      { label: 'Blog',    href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border pt-14 pb-10">
      <div className="container-main">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group w-fit mb-4">
              <div className="flex flex-col gap-[3.5px]">
                <span className="block h-[2px] bg-accent rounded-sm transition-all duration-300 w-[22px] group-hover:w-[10px]" />
                <span className="block h-[2px] bg-accent rounded-sm w-[16px]" />
                <span className="block h-[2px] bg-accent rounded-sm transition-all duration-300 w-[10px] group-hover:w-[22px]" />
              </div>
              <span className="font-heading font-bold text-[17px] tracking-[-0.01em] text-tx">
                Stratum
              </span>
            </Link>
            <p className="text-[13px] text-dim font-light leading-[1.75] max-w-[230px]">
              Pipeline observability for data teams who care about shipping right.
              Built by engineers who have felt the pain.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {/* GitHub */}
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted hover:text-tx hover:border-border2 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" aria-label="X / Twitter" className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted hover:text-tx hover:border-border2 transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted hover:text-tx hover:border-border2 transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-dim mb-4 font-bold">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13.5px] text-muted font-light hover:text-tx transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7 border-t border-border">
          <span className="font-mono text-[11px] text-dim">
            © 2025 Stratum, Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[11px] text-dim hover:text-muted transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
