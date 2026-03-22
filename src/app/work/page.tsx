import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — Stratum',
  description: 'A look at how data teams are using Stratum to ship pipelines with confidence.',
}

const cases = [
  {
    client:  'Watershed',
    tags:    ['Climate Tech', 'Data Warehouse', 'dbt'],
    headline: 'From silent breakages to zero-surprise deploys',
    summary:
      'Watershed runs carbon accounting pipelines for hundreds of enterprise clients. A single bad deploy meant wrong emissions data — not something you can quietly roll back. Stratum gave their data team environment promotion gates and schema drift alerts, cutting data incidents by 60% in eight weeks.',
    metric1: { label: 'Reduction in data incidents', value: '60%' },
    metric2: { label: 'Pipelines monitored', value: '38' },
    color:   '#4CAF7C',
  },
  {
    client:  'Linear',
    tags:    ['B2B SaaS', 'Snowflake', 'Airflow'],
    headline: 'Shipping product analytics without waking up at 3am',
    summary:
      'Linear\'s data team was small and fast-moving — but their Airflow DAGs were fragile. A schema change in one upstream event would break their entire product analytics stack. With Stratum, they version every DAG, get paged before stakeholders notice, and deploy changes in one click.',
    metric1: { label: 'Faster pipeline deploys', value: '4×' },
    metric2: { label: 'Hours saved weekly', value: '14' },
    color:   '#5E6AD2',
  },
  {
    client:  'Retool',
    tags:    ['Developer Tools', 'BigQuery', 'Fivetran'],
    headline: 'Lineage that actually makes sense to engineers',
    summary:
      'Retool\'s data team was spending three hours a week tracing why a downstream model was stale. The answer was always somewhere in a chain of upstream dependencies nobody had documented. Stratum\'s lineage visualization turned a three-hour debugging session into a two-minute click-through.',
    metric1: { label: 'Debugging time saved', value: '3hr/wk' },
    metric2: { label: 'Source connections', value: '12' },
    color:   '#3D63DD',
  },
]

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-[140px]">

        {/* Header */}
        <div className="container-main mb-20">
          <span className="section-tag">Work</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h1 className="display-heading text-[clamp(36px,5vw,64px)]">
              How teams use<br />
              <em className="serif-em text-muted">Stratum in the wild.</em>
            </h1>
            <p className="text-[16px] text-muted font-light leading-[1.75]">
              A look at the real problems data teams were dealing with before
              they started using Stratum — and what changed after.
            </p>
          </div>
        </div>

        {/* Case studies */}
        <div className="container-main space-y-px border border-border rounded-2xl overflow-hidden mb-20">
          {cases.map((c, i) => (
            <div
              key={c.client}
              className="group bg-surface hover:bg-s2 transition-colors duration-300 p-10 lg:p-14"
            >
              {/* Top row */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-heading font-bold text-[13px]"
                  style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}
                >
                  {c.client.slice(0, 1)}
                </div>
                <span className="font-heading font-bold text-tx text-[16px]">{c.client}</span>
                <div className="flex gap-2 flex-wrap">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10.5px] text-dim border border-border px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="ml-auto font-mono text-[11px] text-dim">
                  {String(i + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-heading font-bold text-[clamp(22px,2.8vw,36px)] tracking-[-0.02em] text-tx mb-4 max-w-[680px] overflow-visible leading-[1.15]">
                {c.headline}
              </h2>

              {/* Summary */}
              <p className="text-[15px] text-muted font-light leading-[1.75] max-w-[640px] mb-8">
                {c.summary}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-8">
                {[c.metric1, c.metric2].map((m) => (
                  <div key={m.label}>
                    <div
                      className="font-heading font-extrabold text-[32px] tracking-[-0.04em] leading-none mb-1 overflow-visible"
                      style={{ color: c.color }}
                    >
                      {m.value}
                    </div>
                    <div className="font-mono text-[11px] text-dim">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="border-t border-border bg-surface">
          <div className="container-main py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading font-bold text-[20px] tracking-[-0.02em] text-tx mb-1 overflow-visible">
                Want results like these?
              </p>
              <p className="text-[14px] text-muted font-light">
                Most teams catch their first pipeline failure in the first week.
              </p>
            </div>
            <Link href="/#cta" className="btn-primary flex-shrink-0">
              Get early access →
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
