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
  const scrollAreaRef = useRef<HTMLDivElement>(null)
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

  // Scroll-driven effects
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
        // Image zoom-out
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

        // Pin quote at center — pure top update, no opacity
        const area = scrollAreaRef.current
        const quote = quoteRef.current
        if (area && quote) {
          const areaRect = area.getBoundingClientRect()
          const vh = window.innerHeight
          const quoteH = quote.offsetHeight
          const areaH = area.offsetHeight

          // Where top should be to keep quote visually at viewport center
          const centeredTop = (vh / 2) - (quoteH / 2) - areaRect.top

          // Clamp between 0 and (areaH - quoteH) so it scrolls away with the area
          const maxTop = areaH - quoteH
          const finalTop = Math.max(0, Math.min(centeredTop, maxTop))

          quote.style.top = finalTop + 'px'
        }

        // Word-by-word color reveal
        if (scrollAreaRef.current) {
          const rect = scrollAreaRef.current.getBoundingClientRect()
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
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
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

      {/* First image — before the scroll area */}
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

      {/* Scroll area: quote overlay + remaining images */}
      <div className="gallery-scroll-area" ref={scrollAreaRef}>

        {/* Quote — absolute, JS updates top. Scrolls away with area. */}
        <div className="gallery-quote-pinned" ref={quoteRef}>
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

        {/* Remaining images — define the scroll height */}
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

        {/* Extra height so quote stays centered after last image */}
        <div style={{ height: '60vh' }} />
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
