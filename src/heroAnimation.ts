import gsap from 'gsap'

/**
 * heroAnimation.ts
 * ──────────────────────────────────────────────────
 * Luxury curtain-reveal hero entrance animation.
 *
 * Phase 1: Preloader — two black panels with brand reveal
 * Phase 2: Curtain split — panels slide away
 * Phase 3: Hero content staggered reveal with masked text
 *
 * Uses a single master GSAP timeline. Curtain DOM is
 * injected dynamically and removed after animation completes.
 * ──────────────────────────────────────────────────
 */

const CURTAIN_BG = '#0a0c18'
const GOLD = '#b8922a'

/**
 * Injects the curtain overlay DOM into the document body.
 * Returns references to the created elements.
 */
function createCurtainDOM() {
  const wrapper = document.createElement('div')
  wrapper.id = 'curtain-wrapper'
  wrapper.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    display: flex; flex-direction: column;
    pointer-events: none;
  `

  // Top panel
  const top = document.createElement('div')
  top.id = 'curtain-top'
  top.style.cssText = `
    flex: 1; background: ${CURTAIN_BG};
    pointer-events: auto;
  `

  // Bottom panel
  const bottom = document.createElement('div')
  bottom.id = 'curtain-bottom'
  bottom.style.cssText = `
    flex: 1; background: ${CURTAIN_BG};
    pointer-events: auto;
  `

  // Brand overlay — centered on top of both panels
  const brand = document.createElement('div')
  brand.id = 'curtain-brand'
  brand.style.cssText = `
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    display: flex; flex-direction: column;
    align-items: center; gap: 16px;
    z-index: 10000; pointer-events: none;
  `

  // Gold line
  const line = document.createElement('div')
  line.id = 'curtain-line'
  line.style.cssText = `
    width: 60px; height: 1px; background: ${GOLD};
    transform: scaleX(0); transform-origin: center;
  `

  // Site name
  const name = document.createElement('div')
  name.id = 'curtain-name'
  name.style.cssText = `
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 300;
    color: ${GOLD}; letter-spacing: 0.08em;
    opacity: 0; transform: translateY(10px);
  `
  name.textContent = 'Let There Be Lights'

  // Tagline
  const tagline = document.createElement('div')
  tagline.id = 'curtain-tagline'
  tagline.style.cssText = `
    font-family: 'Libre Baskerville', Georgia, serif;
    font-size: 0.88rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(255,255,255,0.8);
    opacity: 0; transform: translateY(8px);
  `
  tagline.textContent = '365 Reflections · One Each Day'

  brand.append(line, name, tagline)
  wrapper.append(top, bottom, brand)
  document.body.prepend(wrapper)

  return { wrapper, top, bottom, brand, line, name, tagline }
}

/**
 * Wraps each title line's inner content in a mask span for the
 * clip/reveal effect: overflow:hidden parent, translateY child.
 */
function wrapTitleLinesInMask() {
  const lines = document.querySelectorAll('.hero-title-line-1, .hero-title-line-2')
  lines.forEach((el) => {
    const inner = document.createElement('span')
    inner.className = 'hero-title-mask-inner'
    inner.style.display = 'inline-block'
    // Move all child nodes into the inner wrapper
    while (el.firstChild) {
      inner.appendChild(el.firstChild)
    }
    ; (el as HTMLElement).style.overflow = 'hidden'
      ; (el as HTMLElement).style.display = 'block'
    el.appendChild(inner)
  })
}

/**
 * Main entry: builds and plays the master GSAP timeline.
 * Call once on mount.
 */
export function playHeroEntrance() {
  // Bail on reduced-motion — show everything instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set([
      'nav', '.hero-eyebrow', '.hero-title-line-1', '.hero-title-line-2',
      '.hero-subtitle', '.hero-divider', '.hero-cta', '.hero__canvas',
      '.hero__scroll-indicator'
    ], { opacity: 1, y: 0, clearProps: 'all' })
    return
  }

  // ── Inject curtain DOM ──
  const curtain = createCurtainDOM()

  // ── Wrap title lines for masked reveal ──
  wrapTitleLinesInMask()

  // ── Hide all hero elements before animation ──
  gsap.set('nav', { opacity: 0, y: -20 })
  gsap.set('.hero-eyebrow', { opacity: 0, y: 16 })
  gsap.set('.hero-title-mask-inner', { yPercent: 110 })
  gsap.set('.hero-subtitle', { opacity: 0, y: 14 })
  gsap.set('.hero-divider', { scaleY: 0, transformOrigin: 'top center' })
  gsap.set('.hero-cta', { opacity: 0, y: 10 })
  gsap.set('.hero__canvas', { opacity: 0 })
  gsap.set('.hero__scroll-indicator', { opacity: 0 })

  // ── Master timeline ──
  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      // Clean up curtain from DOM
      curtain.wrapper.remove()
    },
  })

  // ═══ PHASE 1: Preloader brand reveal (0s – 1.5s) ═══
  tl.to(curtain.line, {
    scaleX: 1,
    duration: 0.6,
    ease: 'power2.out',
  })
    .to(curtain.name, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.15')
    .to(curtain.tagline, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2')
    // Hold
    .to({}, { duration: 0.8 })

    // ═══ PHASE 2: Curtain split (1.5s – 2.5s) ═══
    // Fade out brand first
    .to(curtain.brand, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    })
    // Split panels
    .to(curtain.top, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut',
    }, '-=0.05')
    .to(curtain.bottom, {
      yPercent: 100,
      duration: 1.1,
      ease: 'power4.inOut',
    }, '<') // simultaneous with top

    // ═══ PHASE 3: Hero content reveal (overlaps with curtain end) ═══
    // Nav
    .to('nav', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.5')

    // Particles canvas fade in
    .to('.hero__canvas', {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    }, '<')

    // Eyebrow
    .to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=1.2')

    // Title line 1 — masked reveal
    .to('.hero-title-line-1 .hero-title-mask-inner', {
      yPercent: 0,
      duration: 1.0,
      ease: 'power4.out',
    }, '-=0.8')

    // Title line 2 — masked reveal (staggered)
    .to('.hero-title-line-2 .hero-title-mask-inner', {
      yPercent: 0,
      duration: 1.0,
      ease: 'power4.out',
    }, '-=0.88')

    // Subtitle
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.5')

    // Divider line
    .to('.hero-divider', {
      scaleY: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')

    // CTA button
    .to('.hero-cta', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.25')

    // Scroll indicator
    .to('.hero__scroll-indicator', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')

  return tl
}
