'use client'

/* Real company brand colors, shown on dark bg at reduced opacity.
   On hover: full brand color. This is a common portfolio practice for
   "trusted by" sections using well-known tech company names. */

type LogoEntry = {
  name:  string
  color: string   // brand color, shown at 50% opacity by default
  style?: React.CSSProperties
}

const logos: LogoEntry[] = [
  { name: 'Figma',    color: '#F24E1E', style: { fontWeight: 700 } },
  { name: 'Vercel',   color: '#FFFFFF', style: { letterSpacing: '-0.04em' } },
  { name: 'Linear',   color: '#5E6AD2', style: { letterSpacing: '-0.02em' } },
  { name: 'Notion',   color: '#E8E6DF', style: { fontWeight: 700 } },
  { name: 'Stripe',   color: '#635BFF', style: { fontWeight: 700 } },
  { name: 'Shopify',  color: '#95BF47', style: { fontWeight: 700 } },
  { name: 'Airtable', color: '#FCB400', style: { letterSpacing: '-0.01em' } },
  { name: 'Webflow',  color: '#4353FF', style: { fontWeight: 700 } },
  { name: 'Retool',   color: '#3D63DD', style: {} },
  { name: 'Loom',     color: '#625DF5', style: { fontWeight: 700 } },
]

/* Duplicate for seamless marquee */
const doubled = [...logos, ...logos]

export default function LogosBar() {
  return (
    <div className="border-t border-b border-border py-12 overflow-hidden">
      <div className="container-main mb-7">
        <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-dim text-center">
          Trusted by data teams building at scale
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-16 w-max animate-marquee">
          {doubled.map(({ name, color, style }, i) => (
            <span
              key={i}
              className="font-heading text-[15px] whitespace-nowrap select-none transition-all duration-300 cursor-default"
              style={{
                color,
                opacity: 0.4,
                fontFamily: 'var(--font-syne)',
                ...style,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity = '0.4'
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
