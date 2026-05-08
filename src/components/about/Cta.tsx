import { useRef } from 'react'
import { useMaskedReveal } from '../../hooks/useAboutAnimations.ts'

export default function AboutCta() {
  const ctaRef = useRef<HTMLElement>(null)
  useMaskedReveal(ctaRef, 0.2)

  return (
    <section ref={ctaRef} className="ap-cta">
      <div className="ap-cta__inner">
        <h2 className="ap-cta__title">
          <div className="ab-line-wrap"><span className="ab-line-inner">A year of light</span></div>
          <div className="ab-line-wrap"><span className="ab-line-inner ap-cta__gold">starts with one page.</span></div>
        </h2>
        <div className="ap-cta__buttons ab-fade-up">
          <a
            href="https://let-there-be-lights.org/biblegallery/gallery"
            className="ap-btn ap-btn--primary"
          >
            Explore the Gallery
          </a>
          <a
            href="https://let-there-be-lights.org/site/contact"
            className="ap-btn ap-btn--secondary"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
