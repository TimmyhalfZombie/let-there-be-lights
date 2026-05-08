import { useEffect } from 'react'
import { initSectionReveals, initQuoteAnimation } from '../animations.ts'
import Hero from '../components/home/Hero.tsx'
import GoldDivider from '../components/home/GoldDivider.tsx'
import TodaySection from '../components/home/TodaySection.tsx'
import AboutSection from '../components/home/AboutSection.tsx'
import GalleryPreview from '../components/home/GalleryPreview.tsx'
import MonthsNav from '../components/home/MonthsNav.tsx'

export default function HomePage() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    initSectionReveals()
    initQuoteAnimation()
  }, [])

  return (
    <main>
      <Hero />
      <GoldDivider />
      <TodaySection />
      <GoldDivider />
      <MonthsNav />
      <GoldDivider />
      <GalleryPreview />
      <GoldDivider />
      <AboutSection />
    </main>
  )
}
