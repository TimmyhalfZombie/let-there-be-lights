import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function TodaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useScrollReveal([eyebrowRef, cardRef])

  // Framer Motion parallax — card floats up slightly as you scroll through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6])

  return (
    <section id="today" className="today" ref={sectionRef}>
      <div className="container">
        <p ref={eyebrowRef} className="section-eyebrow reveal">
          Today's Light
        </p>

        {/* 
          NOTE: Dynamic day-of-year mapping would construct the image URL from:
          const dayOfYear = Math.ceil((+new Date() - +new Date(new Date().getFullYear(),0,1)) / 86400000);
          Since we don't have the full filename index, this uses a design placeholder.
        */}
        <motion.div
          ref={cardRef}
          className="today__card reveal"
          style={{ y, opacity }}
        >
          <div className="today__image-wrap">
            <img
              src="/images/Let-Your-Light-Shine.jpg"
              alt="Let Your Light Shine — a devotional image with an inspiring Scripture verse"
              loading="eager"
            />
          </div>
          <div className="today__text">
            <h2 className="today__title">Let Your Light Shine</h2>
            <p className="today__prompt">
              Take a moment. Breathe. Let this truth settle.
            </p>
            <a
              href="https://let-there-be-lights.org/biblegallery/gallery"
              className="today__link"
            >
              Open the Gallery →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
