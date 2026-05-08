import { useRef } from 'react'
import { useMaskedReveal } from '../../hooks/useAboutAnimations.ts'

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null)
  useMaskedReveal(heroRef, 0.1)

  return (
    <section ref={heroRef} className="ap-hero">
      <div className="ap-hero__inner">
        <span className="ap-eyebrow ab-fade-up">About the Book</span>
        <h1 className="ap-hero__title">
          <div className="ab-line-wrap"><span className="ab-line-inner">Twenty years.</span></div>
          <div className="ab-line-wrap"><span className="ab-line-inner ap-hero__gold">Three hundred sixty-five truths.</span></div>
        </h1>
      </div>
    </section>
  )
}
