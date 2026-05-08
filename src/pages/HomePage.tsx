import { useEffect } from 'react'
import { playHeroEntrance } from '../heroAnimation.ts'
import { initSectionReveals, initQuoteAnimation } from '../animations.ts'
import Hero from '../components/Hero.tsx'
import GoldDivider from '../components/GoldDivider.tsx'
import TodaySection from '../components/TodaySection.tsx'
import AboutSection from '../components/AboutSection.tsx'
import GalleryPreview from '../components/GalleryPreview.tsx'
import MonthsNav from '../components/MonthsNav.tsx'

export default function HomePage() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    playHeroEntrance()
    initSectionReveals()
    initQuoteAnimation()
  }, [])

  return (
    <main>
      <Hero />
      <GoldDivider />
      <TodaySection />
      <GoldDivider />
      <AboutSection />
      <GoldDivider />
      <GalleryPreview />
      <GoldDivider />
      <MonthsNav />
    </main>
  )
}
