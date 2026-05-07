import { useEffect } from 'react'

/**
 * useScrollReveal — IntersectionObserver-based scroll reveal
 * Accepts an array of refs. When each element enters the viewport
 * (threshold 0.15), adds .visible class to trigger CSS animation.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(
  refs: Array<React.RefObject<HTMLElement | null> | { current: HTMLElement | null }>
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const elements = refs
      .map(r => r.current)
      .filter((el): el is HTMLElement => el !== null)

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('visible'))
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

    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [refs])
}
