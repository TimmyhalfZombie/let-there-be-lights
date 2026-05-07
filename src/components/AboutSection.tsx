import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useScrollReveal([statRef, textRef])

  // Parallax: the big 365 number drifts slower than the text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const statY = useTransform(scrollYProgress, [0, 1], [80, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -20])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.97])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container about__grid">
        <motion.div ref={statRef} className="about__stat reveal" style={{ y: statY, scale }}>
          <span className="about__number">365</span>
          <span className="about__unit">Images</span>
        </motion.div>
        <motion.div ref={textRef} className="about__text reveal" style={{ y: textY }}>
          <h2 className="about__title">
            Wisdom for<br /><em>every season</em>
          </h2>
          <p className="about__body">
            Each image pairs a timeless truth — drawn from Scripture, history,
            and the lives of those who walked before us — with a visual that
            quietly speaks to the soul. One reflection per day. Twelve months.
            A full year of light.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
