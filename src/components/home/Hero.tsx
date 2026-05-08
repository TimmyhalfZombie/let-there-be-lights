import { useEffect, useRef } from 'react'
import AppStoreButtons from '../sharable/button'

/* ── Particle Canvas ────────────────────────────── */

interface Particle {
  x: number; y: number; radius: number; opacity: number
  speedY: number; speedX: number
  baseOpacity: number; flickerSpeed: number; flickerOffset: number
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const PARTICLE_COUNT = 60
    const FRAME_INTERVAL = 1000 / 30
    let lastTime = 0
    let animId: number | null = null
    let isVisible = true
    const particles: Particle[] = []

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = canvas!.offsetWidth * dpr
      canvas!.height = canvas!.offsetHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function create(): Particle {
      return {
        x: Math.random() * canvas!.offsetWidth,
        y: Math.random() * canvas!.offsetHeight,
        radius: 1 + Math.random() * 1.5,
        opacity: 0.08 + Math.random() * 0.37,
        speedY: -(0.15 + Math.random() * 0.3),
        speedX: (Math.random() - 0.5) * 0.2,
        baseOpacity: 0.08 + Math.random() * 0.37,
        flickerSpeed: 0.005 + Math.random() * 0.01,
        flickerOffset: Math.random() * Math.PI * 2,
      }
    }

    resize()
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(create())

    if (prefersReduced) {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.opacity * 0.5})`
        ctx.fill()
      }
      return
    }

    function draw(ts: number) {
      if (!isVisible) return
      animId = requestAnimationFrame(draw)
      if (ts - lastTime < FRAME_INTERVAL) return
      lastTime = ts

      const w = canvas!.offsetWidth, h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        p.opacity = p.baseOpacity + Math.sin(ts * p.flickerSpeed + p.flickerOffset) * 0.08
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(201,168,76,${Math.max(0, p.opacity)})`
        ctx!.fill()
      }
    }

    animId = requestAnimationFrame(draw)

    const onVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && animId === null) animId = requestAnimationFrame(draw)
    }
    const onResize = () => resize()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)

    return () => {
      if (animId !== null) cancelAnimationFrame(animId)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [canvasRef])
}

/* ── Hero Component ─────────────────────────────── */

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticles(canvasRef)

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      <div className="hero__content">
        {/* Eyebrow */}
        <p className="hero__eyebrow hero-eyebrow">
          365 Reflections · One Each Day
        </p>

        {/* Title */}
        <h1 className="hero__title">
          <span className="hero__title-line hero-title-line-1">
            A Light
          </span>
          <span className="hero__title-line hero__title-line--gold hero-title-line-2">
            <em>for Every Day</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero__subtitle hero-subtitle">
          A curated collection of wisdom and Scripture — one image, one truth, one day at a time.
        </p>

        {/* Vertical divider line between subtitle and CTA */}
        <div className="hero-divider" aria-hidden="true" />

        {/* CTA Button */}
        <div className="hero__cta-wrapper hero-cta" style={{ display: 'flex', justifyContent: 'center' }}>
          <AppStoreButtons style={{ margin: 0 }} />
        </div>
      </div>
    </section>
  )
}
