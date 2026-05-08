import { useEffect } from 'react'
import { useLenis } from './hooks/useLenis.ts'
import { playHeroEntrance } from './heroAnimation.ts'
import { initSectionReveals, initQuoteAnimation } from './animations.ts'
import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import GoldDivider from './components/GoldDivider.tsx'
import TodaySection from './components/TodaySection.tsx'
import AboutSection from './components/AboutSection.tsx'
import GalleryPreview from './components/GalleryPreview.tsx'
import MonthsNav from './components/MonthsNav.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  // Enable smooth scroll site-wide
  useLenis()

  // Initialize animations on mount
  useEffect(() => {
    // Force scroll to top on reload so hero animation always starts at the top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Luxury curtain-reveal hero entrance
    playHeroEntrance()

    // GSAP scroll-triggered reveals for sections below the fold
    initSectionReveals()
    initQuoteAnimation()
  }, [])

  return (
    <>
      <Nav />
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
      <Footer />
    </>
  )
}
