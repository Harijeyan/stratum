import Nav            from '@/components/Nav'
import Hero           from '@/components/Hero'
import LogosBar       from '@/components/LogosBar'
import DataSourcesSection from '@/components/DataSourcesSection'
import PipelineSection from '@/components/PipelineSection'
import Problem        from '@/components/Problem'
import HowItWorks     from '@/components/HowItWorks'
import Features       from '@/components/Features'
import Metrics        from '@/components/Metrics'
import Testimonial    from '@/components/Testimonial'
import Pricing        from '@/components/Pricing'
import CTASection     from '@/components/CTASection'
import Footer         from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogosBar />
        <DataSourcesSection />
        <PipelineSection />
        <Problem />
        <HowItWorks />
        <Features />
        <Metrics />
        <Testimonial />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
