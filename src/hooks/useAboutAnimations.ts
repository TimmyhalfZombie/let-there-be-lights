import { useEffect } from 'react'

/**
 * Observes all .ab-reveal elements inside a container.
 * Adds .visible class when they scroll into view. Fires once per element.
 */
export function useAboutReveals(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const reveals = container.querySelectorAll<HTMLElement>('.ab-reveal')
    if (prefersReduced) {
      reveals.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none' })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}

/**
 * Masked line reveal for .ab-line-inner and .ab-fade-up elements
 * inside a section. Fires once on intersection.
 */
export function useMaskedReveal(sectionRef: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.querySelectorAll<HTMLElement>('.ab-line-inner, .ab-fade-up').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.querySelectorAll('.ab-line-inner').forEach((line, i) => {
              ;(line as HTMLElement).style.transitionDelay = `${300 + i * 140}ms`
              line.classList.add('visible')
            })
            target.querySelectorAll('.ab-fade-up').forEach((el, i) => {
              ;(el as HTMLElement).style.transitionDelay = `${600 + i * 150}ms`
              el.classList.add('visible')
            })
            observer.unobserve(target)
          }
        })
      },
      { threshold }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [sectionRef, threshold])
}
