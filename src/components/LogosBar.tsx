'use client'

type LogoEntry = {
  name:  string
  file:  string
  width: number
}

const logos: LogoEntry[] = [
  { name: 'Airtable', file: 'airtable-1.svg',    width: 100 },
  { name: 'Notion',   file: 'notion-2.svg',       width: 27  },
  { name: 'Shopify',  file: 'shopify-2.svg',      width: 96  },
  { name: 'Stripe',   file: 'stripe-4.svg',       width: 72  },
  { name: 'Webflow',  file: 'webflow-logo-1.svg', width: 96  },
]

// Two identical copies — animation scrolls exactly one set width (-50%),
// so the loop point is invisible.
const track = [...logos, ...logos]

export default function LogosBar() {
  return (
    <div className="border-t border-b border-border py-12 overflow-hidden">
      <div className="container-main mb-8">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted text-center">
          Trusted by data teams building at scale
        </p>
      </div>

      {/* Fade mask hides the loop seam on both edges */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex items-center gap-16 w-max animate-marquee">
          {track.map(({ name, file, width }, i) => (
            <img
              key={i}
              src={`/customer_logos/${file}`}
              alt={name}
              draggable={false}
              className="select-none object-contain"
              style={{ width, height: 28, filter: 'brightness(0) invert(1)', opacity: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
