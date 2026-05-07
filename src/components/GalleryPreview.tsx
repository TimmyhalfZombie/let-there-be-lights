import { useRef, useEffect } from 'react'

const ALL_IMAGES = [
  { src: '/images/Let-Your-Light-Shine.jpg', title: 'Let Your Light Shine', day: 'Jul 13' },
  { src: '/images/Faith.jpg', title: 'Faith', day: 'Apr 21' },
  { src: '/images/Courage.jpg', title: 'Courage', day: 'Mar 10' },
  { src: '/images/Forgiveness.jpg', title: 'Forgiveness', day: 'May 1' },
  { src: '/images/Kindness.jpg', title: 'Kindness', day: 'Jul 4' },
  { src: '/images/Peace-Cultivated.jpg', title: 'Peace Cultivated', day: 'Aug 27' },
]

const QUOTE_TEXT = "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: He leadeth me beside the still waters. He restoreth my soul: He leadeth me in the paths of righteousness for His name's sake."

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const stickySectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])

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

  // JS-driven: pin quote at center, zoom images, word-by-word reveal
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      wordRefs.current.forEach(w => { w.style.color = 'var(--text)' })
      return
    }

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const stickySection = stickySectionRef.current
        const quote = quoteRef.current

        // --- Image zoom-out ---
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

        // --- JS-pinned quote (fixed only, fade in/out — no position switching) ---
        if (stickySection && quote) {
          const sectionRect = stickySection.getBoundingClientRect()
          const vh = window.innerHeight
          const quoteH = quote.offsetHeight

          const pinStart = sectionRect.top <= vh * 0.4
          const pinEnd = sectionRect.bottom <= vh * 0.5 + quoteH

          // Always keep it fixed center — only change opacity
          quote.style.position = 'fixed'
          quote.style.top = '50%'
          quote.style.left = '50%'
          quote.style.transform = 'translate(-50%, -50%)'

          if (!pinStart) {
            // Before section — hidden
            quote.style.opacity = '0'
          } else if (pinStart && !pinEnd) {
            // Section active — fully visible
            quote.style.opacity = '1'
          } else {
            // Section ending — fade out smoothly
            const fadeRange = vh * 0.3
            const fadeProgress = Math.min(1, Math.max(0,
              (vh * 0.5 + quoteH - sectionRect.bottom) / fadeRange
            ))
            quote.style.opacity = String(1 - fadeProgress)
          }
        }

        // --- Word-by-word color reveal ---
        if (stickySection) {
          const rect = stickySection.getBoundingClientRect()
          const vh = window.innerHeight
          const sectionProgress = Math.min(1, Math.max(0,
            (vh - rect.top) / (rect.height + vh)
          ))

          const totalWords = wordRefs.current.length
          wordRefs.current.forEach((word, i) => {
            const wordStart = (i / totalWords) * 0.55
            const wordEnd = wordStart + (1 / totalWords) + 0.05
            const wordProgress = Math.min(1, Math.max(0,
              (sectionProgress - wordStart) / (wordEnd - wordStart)
            ))
            const opacity = 0.12 + (wordProgress * 0.88)
            word.style.color = `rgba(237, 233, 225, ${opacity})`
          })
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const quoteWords = QUOTE_TEXT.split(' ')

  return (
    <section id="gallery_preview" className="gallery-preview" ref={sectionRef}>
      {/* Header */}
      <div className="container gallery-preview__header">
        <p className="section-eyebrow reveal">From the Collection</p>
        <h2 className="gallery-preview__title reveal">
          Open any day.<br /><em>Find your light.</em>
        </h2>
      </div>

      {/* First image */}
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

      {/* Sticky section: quote pinned via JS + images scroll past */}
      <div className="gallery-sticky-section" ref={stickySectionRef}>

        {/* Quote — positioned via JS (absolute/fixed/absolute) */}
        <div className="gallery-quote-js" ref={quoteRef}>
          <div className="gallery-center-icon" aria-hidden="true">✦</div>
          <blockquote className="gallery-center-text">
            {quoteWords.map((word, i) => (
              <span
                key={i}
                ref={el => { if (el) wordRefs.current[i] = el }}
                className="quote-word"
              >
                {word}{' '}
              </span>
            ))}
          </blockquote>
          <cite className="gallery-center-cite">Psalm 23:1–3</cite>
          <div className="gallery-center-line" aria-hidden="true" />
        </div>

        {/* Images scroll past the pinned quote */}
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
