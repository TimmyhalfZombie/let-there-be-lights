import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AppStoreButtons from '../sharable/button'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement

            // Trigger all .about-fade elements (stat side) with stagger
            const fades = section.querySelectorAll('.about-fade')
            fades.forEach((el, index) => {
              const delay = 200 + index * 140
                ; (el as HTMLElement).style.transitionDelay = `${delay}ms`
              el.classList.add('visible')
            })

            // Trigger all .line-inner elements (text side) with stagger
            const lines = section.querySelectorAll('.line-inner')
            lines.forEach((line, index) => {
              const delay = 200 + index * 140
                ; (line as HTMLElement).style.transitionDelay = `${delay}ms`
              line.classList.add('visible')
            })

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Parallax: the big 365 number drifts slower than the text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [40, -20])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container about__grid">
        <div ref={statRef} className="about__stat">
          <span className="about-fade about__number">365</span>
          <span className="about-fade about__unit">Images</span>
        </div>
        <motion.div ref={textRef} className="about__text" style={{ y: textY }}>
          <h2 className="about__title">
            <div className="line-wrap"><span className="line-inner">Wisdom for</span></div>
            <div className="line-wrap"><span className="line-inner"><em>every season</em></span></div>
          </h2>

          <div className="line-wrap">
            <p className="line-inner about__body">
              Each image pairs a timeless truth — drawn from Scripture, history,
              and the lives of those who walked before us — with a visual that
              quietly speaks to the soul. One reflection per day. Twelve months.
              A full year of light.
            </p>
          </div>

          <div className="line-wrap">
            <div className="line-inner app-links-wrapper">
              <AppStoreButtons showExploreGallery />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
