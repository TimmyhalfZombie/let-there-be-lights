import { useRef, useEffect, useState } from 'react'

const ALL_IMAGES = [
  { src: '/images/Let-Your-Light-Shine.jpg', title: 'Let Your Light Shine', day: 'Jul 13' },
  { src: '/images/Faith.jpg', title: 'Faith', day: 'Apr 21' },
  { src: '/images/Courage.jpg', title: 'Courage', day: 'Mar 10' },
  { src: '/images/Forgiveness.jpg', title: 'Forgiveness', day: 'May 1' },
  { src: '/images/Kindness.jpg', title: 'Kindness', day: 'Jul 4' },
  { src: '/images/Peace-Cultivated.jpg', title: 'Peace Cultivated', day: 'Aug 27' },
]

const QUOTE_TEXT = "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: He leadeth me beside the still waters. He restoreth my soul: He leadeth me in the paths of righteousness for His name's sake."

const MOBILE_BREAKPOINT = 1024

function useDivineRadiance(canvasRef: React.RefObject<HTMLCanvasElement | null>, sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Start invisible
    canvas.style.opacity = '0'
    canvas.style.transition = 'opacity 1.8s ease'

    // Resize handler
    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Fade-in on viewport entry
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          canvas!.style.opacity = '1'
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px' })
    observer.observe(section)

    // Animation loop
    let t = 0
    let animId: number

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width, h = canvas.height
      const cx = w / 2, cy = h / 2

      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = '#07070F'
      ctx.fillRect(0, 0, w, h)

      const isDesktop = w > 1024
      const radiusMult = isDesktop ? 1.15 : 1.0

      const pulse = 0.5 + 0.5 * Math.sin(t * 0.012)
      const vh = window.innerHeight
      const minDim = Math.min(w, isDesktop ? vh : h)

      // Outer glow
      const r1 = minDim * 0.55 * radiusMult * (0.9 + 0.1 * pulse)
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1)
      if (isDesktop) {
        g1.addColorStop(0, 'rgba(230, 180, 80, 0.25)')
        g1.addColorStop(0.35, 'rgba(210, 160, 60, 0.12)')
      } else {
        g1.addColorStop(0, 'rgba(180, 130, 40, 0.13)')
        g1.addColorStop(0.35, 'rgba(160, 110, 30, 0.07)')
      }
      g1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)

      // Inner glow
      const r2 = minDim * 0.25 * radiusMult * (0.9 + 0.1 * pulse)
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r2)
      if (isDesktop) {
        g2.addColorStop(0, 'rgba(255, 220, 120, 0.25)')
      } else {
        g2.addColorStop(0, 'rgba(220, 170, 60, 0.10)')
      }
      g2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, w, h)

      // Concentric rings
      for (let i = 3; i >= 1; i--) {
        const rr = minDim * (0.12 * i) * radiusMult * (0.95 + 0.05 * Math.sin(t * 0.015 + i))
        if (isDesktop) {
          ctx.strokeStyle = `rgba(230, 190, 100, ${0.05 / i})`
        } else {
          ctx.strokeStyle = `rgba(201, 168, 76, ${0.025 / i})`
        }
        ctx.lineWidth = i === 1 ? 1.5 : 1
        ctx.beginPath()
        ctx.arc(cx, cy, rr, 0, Math.PI * 2)
        ctx.stroke()
      }

      t++
      animId = requestAnimationFrame(draw)
    }

    // Pause when tab hidden
    function onVisibilityChange() {
      if (document.hidden) cancelAnimationFrame(animId)
      else draw()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()
    }
  }, [canvasRef, sectionRef])
}

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT)

  // Track viewport size
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Divine Radiance canvas animation
  useDivineRadiance(canvasRef, sectionRef)

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
  }, [isMobile])

  // Scroll-driven effects — desktop only
  useEffect(() => {
    if (isMobile) return

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

        // Pin quote at center
        const area = scrollAreaRef.current
        const quote = quoteRef.current
        if (area && quote) {
          const areaRect = area.getBoundingClientRect()
          const vh = window.innerHeight
          const quoteH = quote.offsetHeight
          const areaH = area.offsetHeight
          const centeredTop = (vh / 2) - (quoteH / 2) - areaRect.top
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
  }, [isMobile])

  const quoteWords = QUOTE_TEXT.split(' ')

  return (
    <section id="gallery_preview" className="gallery-preview" ref={sectionRef}>
      {/* Divine Radiance canvas background */}
      <canvas ref={canvasRef} id="radiance-bg" />

      {/* Header — z-index 1 above canvas */}
      <div className="container gallery-preview__header" style={{ position: 'relative', zIndex: 1 }}>
        <p className="section-eyebrow reveal">From the Collection</p>
        <h2 className="gallery-preview__title reveal">
          Open any day.<br /><em>Find your light.</em>
        </h2>
      </div>

      {/* Images + scroll area — desktop only */}
      {!isMobile && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="gallery-alternating">
            <div
              className="gallery-row gallery-row--left"
              ref={el => { cardRefs.current[0] = el }}
            >
              <a href="https://let-there-be-lights.org/biblegallery/gallery?page=1&selected=7" target="_blank" rel="noopener noreferrer" className="gallery-card reveal">
                <img src={ALL_IMAGES[0].src} alt={ALL_IMAGES[0].title} loading="lazy" decoding="async" />
              </a>
            </div>
          </div>

          <div className="gallery-scroll-area" ref={scrollAreaRef}>
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

            <div className="gallery-alternating">
              {ALL_IMAGES.slice(1).map((img, i) => (
                <div
                  key={img.title}
                  className={`gallery-row gallery-row--${(i + 1) % 2 === 0 ? 'left' : 'right'}`}
                  ref={el => { cardRefs.current[i + 1] = el }}
                >
                  <a href="https://let-there-be-lights.org/biblegallery/gallery" target="_blank" rel="noopener noreferrer" className="gallery-card reveal">
                    <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                  </a>
                </div>
              ))}
            </div>

            <div style={{ height: '60vh' }} />
          </div>
        </div>
      )}

      {/* Mobile: just show the verse */}
      {isMobile && (
        <div className="gallery-mobile-quote" style={{ position: 'relative', zIndex: 1 }}>
          <div className="gallery-center-icon" aria-hidden="true">✦</div>
          <blockquote className="gallery-center-text">
            {QUOTE_TEXT}
          </blockquote>
          <cite className="gallery-center-cite">Psalm 23:1–3</cite>
        </div>
      )}

      {/* Footer CTA */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="gallery-preview__cta-wrap reveal">
          <a href="https://let-there-be-lights.org/biblegallery/gallery" className="gallery-preview__cta">
            View All 365 →
          </a>
        </div>
      </div>
    </section>
  )
}
