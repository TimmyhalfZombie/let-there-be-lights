import { useEffect, useRef } from 'react'
import { useAboutReveals } from '../hooks/useAboutAnimations.ts'
import AboutHero from '../components/about/Hero.tsx'
import AboutOrigin from '../components/about/Origin.tsx'
import AboutThreeLights from '../components/about/ThreeLights.tsx'
import AboutClosing from '../components/about/Closing.tsx'
import AboutTestimonials from '../components/about/Testimonials.tsx'
import AboutCta from '../components/about/Cta.tsx'

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useAboutReveals(pageRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={pageRef} className="about-page">
      <AboutHero />
      <AboutOrigin />
      <AboutThreeLights />
      <AboutClosing />
      <AboutTestimonials />
      <AboutCta />
    </div>
  )
}
