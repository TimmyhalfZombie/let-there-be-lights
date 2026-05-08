import { useRef } from 'react'
import { useMaskedReveal } from '../../hooks/useAboutAnimations'
import AppStoreButtons from '../sharable/button'

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
        <div className="ap-cta__buttons ab-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginTop: '3rem' }}>

          <AppStoreButtons style={{ margin: 0, justifyContent: 'center' }} />

          <div style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://let-there-be-lights.org/biblegallery/gallery" className="about__cta about__cta--secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="external-icon">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Explore the Gallery
            </a>
            <a href="https://let-there-be-lights.org/site/contact" className="about__cta about__cta--secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
