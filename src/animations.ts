import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section element reveals — any element with [data-gsap-reveal]
 * fades up with a subtle scale when scrolled into view.
 */
export function initSectionReveals() {
  const runReveals = () => {
    const elements = document.querySelectorAll('[data-gsap-reveal]')
    if (elements.length === 0) {
      setTimeout(runReveals, 50)
      return
    }

    elements.forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    })
  }

  setTimeout(runReveals, 0)
}

/**
 * Quote callout — text splits into words and fades in one by one.
 */
export function initQuoteAnimation() {
  const runAnimation = () => {
    const quote = document.querySelector('.quote-callout__text')
    if (!quote) {
      setTimeout(runAnimation, 50)
      return
    }

    const split = new SplitType('.quote-callout__text', { types: 'words' })

    gsap.from(split.words || [], {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.04,
      scrollTrigger: {
        trigger: '.quote-callout__text',
        start: 'top 80%',
      },
    })
  }

  setTimeout(runAnimation, 0)
}
