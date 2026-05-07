import { useRef, useMemo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function MonthsNav() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useScrollReveal([titleRef, subtitleRef, rowRef])

  const currentMonth = useMemo(() => new Date().getMonth(), [])

  return (
    <section id="months_nav" className="months-nav">
      <div className="container">
        <h2 ref={titleRef} className="months-nav__title reveal">Explore by Month</h2>
        <p ref={subtitleRef} className="months-nav__subtitle reveal">
          Each month holds a chapter of wisdom.
        </p>
        <div ref={rowRef} className="months-nav__row reveal" id="monthsRow">
          {MONTHS.map((month, i) => (
            <a
              key={month}
              href={`https://let-there-be-lights.org/biblegallery/gallery?page=1&selected=${i + 1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="month-pill"
              style={i === currentMonth ? {
                borderColor: 'var(--gold)',
                color: 'var(--gold)',
                background: 'var(--gold-glow)',
              } : undefined}
            >
              {month}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
