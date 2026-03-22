import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Stratum',
  description: 'We built Stratum because we got tired of being the last ones to know when a pipeline broke.',
}

const team = [
  {
    initials: 'AM',
    name:     'Amir Moradi',
    role:     'Co-founder & CEO',
    bio:      'Former data platform lead at Segment. Spent three years on-call for Airflow failures before deciding to fix the problem properly.',
    color:    '#C4622D',
  },
  {
    initials: 'JT',
    name:     'Jana Torres',
    role:     'Co-founder & CTO',
    bio:      'Built data infrastructure at Stripe and dbt Labs. Believes most pipeline incidents are a monitoring problem, not an engineering one.',
    color:    '#29B5E8',
  },
  {
    initials: 'SR',
    name:     'Sam Reeves',
    role:     'Head of Design',
    bio:      'Previously at Linear and Vercel. Thinks tools for data engineers should be as well-crafted as tools for software engineers.',
    color:    '#5E6AD2',
  },
  {
    initials: 'KO',
    name:     'Kofi Osafo',
    role:     'Head of Customer Success',
    bio:      'Analytics engineer turned customer advocate. Has personally onboarded over 80 data teams and knows every edge case by name.',
    color:    '#47A248',
  },
]

const values = [
  {
    label: 'Calm over chaos',
    body: 'Pipelines fail. The goal is to know about it before anyone else, handle it without panic, and understand exactly what changed. Our product is designed around that philosophy.',
  },
  {
    label: 'Boring reliability',
    body: 'We would rather be the tool you forget about because it always works than the tool you talk about because it has interesting features. Reliability is the feature.',
  },
  {
    label: 'Engineers first',
    body: 'Stratum is built for data engineers, not for dashboards or VPs. Every decision goes through the question: would a data engineer trust this?',
  },
  {
    label: 'Simple by default',
    body: 'You can get value in 10 minutes or 10 hours. We try not to hide depth, but we never require it upfront. Start simple, grow into more.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-[140px]">

        {/* Hero */}
        <div className="container-main mb-24">
          <span className="section-tag">About</span>
          <h1 className="display-heading text-[clamp(36px,5vw,64px)] max-w-[760px] mb-8">
            We got tired of being the last
            ones to know when a pipeline broke.
          </h1>
          <p className="text-[17px] text-muted font-light leading-[1.75] max-w-[580px]">
            Stratum started as a set of internal scripts we wrote to survive on-call
            rotations. When we realized every data team we knew had the same problem,
            we decided to turn it into a product.
          </p>
        </div>

        {/* Origin story */}
        <div className="border-t border-b border-border bg-surface">
          <div className="container-main py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
              <div>
                <span className="section-tag">The story</span>
                <h2 className="font-heading font-bold text-[clamp(24px,3vw,36px)] tracking-[-0.02em] text-tx leading-[1.2] overflow-visible">
                  Built from the<br />
                  <em className="font-display italic font-normal text-muted">on-call rotation.</em>
                </h2>
              </div>
              <div className="space-y-5 text-[15px] text-muted font-light leading-[1.8]">
                <p>
                  In 2022, Amir was the data platform lead at a Series B company.
                  Every Monday morning started with the same ritual: checking Slack
                  to see which dashboard had broken over the weekend, and then spending
                  two hours tracing the failure back through Airflow logs.
                </p>
                <p>
                  He and Jana — then a senior data engineer at Stripe — had both
                  built internal tools to catch issues earlier. Theirs worked. But they
                  were duct tape: brittle, undocumented, and the first thing to break
                  when someone changed a schema.
                </p>
                <p>
                  They started building Stratum in the evenings. The first version
                  was a Slack bot that diffed your dbt schemas between runs. Teams
                  loved it. The second version added pipeline versioning. The third
                  version added environment promotion gates.
                </p>
                <p>
                  Today, Stratum is the tool they wished had existed. If you have
                  ever been paged at 2am because a column got renamed upstream, this
                  was built for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="container-main section-pad">
          <div className="max-w-[480px] mb-14">
            <span className="section-tag">Values</span>
            <h2 className="display-heading text-[clamp(28px,3.5vw,48px)]">
              How we think about<br />
              <em className="serif-em text-muted">building this.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {values.map((v) => (
              <div key={v.label} className="bg-surface hover:bg-s2 transition-colors duration-200 p-10">
                <h3 className="font-heading font-bold text-[17px] tracking-[-0.01em] text-tx mb-3 overflow-visible">
                  {v.label}
                </h3>
                <p className="text-[14px] text-muted font-light leading-[1.7]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="border-t border-border">
          <div className="container-main section-pad">
            <div className="max-w-[440px] mb-14">
              <span className="section-tag">Team</span>
              <h2 className="display-heading text-[clamp(28px,3.5vw,48px)]">
                The people behind it.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
              {team.map((member) => (
                <div key={member.name} className="bg-surface hover:bg-s2 transition-colors duration-200 p-8">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-[15px] mb-5"
                    style={{
                      background: `${member.color}18`,
                      color: member.color,
                      border: `1px solid ${member.color}30`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-heading font-bold text-[15px] text-tx mb-0.5 overflow-visible">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10.5px] text-accent mb-3">{member.role}</p>
                  <p className="text-[13px] text-muted font-light leading-[1.65]">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hiring strip */}
        <div className="border-t border-border bg-surface">
          <div className="container-main py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading font-bold text-[20px] tracking-[-0.02em] text-tx mb-1 overflow-visible">
                We are hiring.
              </p>
              <p className="text-[14px] text-muted font-light">
                Remote-first. Looking for people who care about data reliability as much as we do.
              </p>
            </div>
            <Link
              href="#"
              className="btn-ghost flex-shrink-0"
            >
              See open roles →
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
