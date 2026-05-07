import { useRef, useEffect } from 'react'

const ALL_IMAGES = [
  { src: '/images/Let-Your-Light-Shine.jpg', title: 'Let Your Light Shine', day: 'Jul 13' },
  { src: '/images/Faith.jpg', title: 'Faith', day: 'Apr 21' },
  { src: '/images/Courage.jpg', title: 'Courage', day: 'Mar 10' },
  { src: '/images/Forgiveness.jpg', title: 'Forgiveness', day: 'May 1' },
  { src: '/images/Kindness.jpg', title: 'Kindness', day: 'Jul 4' },
  { src: '/images/Peace-Cultivated.jpg', title: 'Peace Cultivated', day: 'Aug 27' },
]

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  // Observe .reveal elements
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealElements = section.querySelectorAll('.reveal')

    if (prefersReduced) {
      revealElements.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealElements.forEach(el => observer.observe(el))
    return () => revealElements.forEach(el => observer.unobserve(el))
  }, [])

  // Scroll-driven zoom-out on images
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        cardRefs.current.forEach(card => {
          if (!card) return
          const img = card.querySelector('img') as HTMLImageElement | null
          if (!img) return

          const rect = card.getBoundingClientRect()
          const vh = window.innerHeight
          const progress = Math.min(1, Math.max(0, 1 - (rect.top / vh)))
          const scale = 1.18 - (progress * 0.18)
          img.style.transform = `scale(${scale})`
        })
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="gallery_preview" className="gallery-preview" ref={sectionRef}>
      {/* Header — full screen centered intro */}
      <div className="container gallery-preview__header">
        <p className="section-eyebrow reveal">From the Collection</p>
        <h2 className="gallery-preview__title reveal">
          Open any day.<br /><em>Find your light.</em>
        </h2>
      </div>

      {/* First image — appears before the quote */}
      <div className="gallery-alternating">
        <div
          className="gallery-row gallery-row--left"
          ref={el => { cardRefs.current[0] = el }}
        >
          <a href="https://let-there-be-lights.org/biblegallery/gallery" className="gallery-card reveal">
            <img src={ALL_IMAGES[0].src} alt={ALL_IMAGES[0].title} loading="lazy" decoding="async" />
          </a>
        </div>
      </div>

      {/* Sticky quote section — quote stays centered while remaining images scroll */}
      <div className="gallery-sticky-section">

        {/* Sticky quote (always visible, no fade) */}
        <div className="gallery-quote-sticky">
          <div className="gallery-center-icon" aria-hidden="true">✦</div>
          <blockquote className="gallery-center-text">
            The Lord is my shepherd; I shall not want.
            He maketh me to lie down in green pastures:
            He leadeth me beside the still waters.
            He restoreth my soul: He leadeth me in the
            paths of righteousness for His name's sake.
          </blockquote>
          <cite className="gallery-center-cite">Psalm 23:1–3</cite>
          <div className="gallery-center-line" aria-hidden="true" />
        </div>

        {/* Remaining images scroll past the sticky quote */}
        <div className="gallery-alternating">
          {ALL_IMAGES.slice(1).map((img, i) => (
            <div
              key={img.title}
              className={`gallery-row gallery-row--${(i + 1) % 2 === 0 ? 'left' : 'right'}`}
              ref={el => { cardRefs.current[i + 1] = el }}
            >
              <a href="https://let-there-be-lights.org/biblegallery/gallery" className="gallery-card reveal">
                <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="container">
        <div className="gallery-preview__cta-wrap reveal">
          <a href="https://let-there-be-lights.org/biblegallery/gallery" className="gallery-preview__cta">
            View All 365 →
          </a>
        </div>
      </div>
    </section>
  )
}
