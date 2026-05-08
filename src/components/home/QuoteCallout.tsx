import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal.ts'

export default function QuoteCallout() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  useScrollReveal([innerRef])

  // Parallax: quote scales up subtly and fades as you scroll past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.4])

  return (
    <section id="quote_callout" className="quote-callout" ref={sectionRef}>
      <motion.div
        ref={innerRef}
        className="quote-callout__inner reveal"
        style={{ scale, opacity }}
      >
        <div className="quote-callout__line" aria-hidden="true" />
        <blockquote className="quote-callout__text">
          Your word is a lamp to my feet and a light to my path.
        </blockquote>
        <cite className="quote-callout__attribution">Psalm 119:105</cite>
        <div className="quote-callout__line" aria-hidden="true" />
      </motion.div>
    </section>
  )
}
