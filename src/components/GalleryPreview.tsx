import { useRef, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

const GALLERY_IMAGES = [
  { src: 'https://let-there-be-lights.org/picture/Let-Your-Light-Shine.jpg', title: 'Let Your Light Shine', day: 'Jul 13', tall: true },
  { src: 'https://let-there-be-lights.org/picture/Faith.jpg', title: 'Faith', day: 'Apr 21', tall: false },
  { src: 'https://let-there-be-lights.org/picture/Courage.jpg', title: 'Courage', day: 'Mar 10', tall: false },
  { src: 'https://let-there-be-lights.org/picture/Forgiveness.jpg', title: 'Forgiveness', day: 'May 1', tall: false },
  { src: 'https://let-there-be-lights.org/picture/Kindness.jpg', title: 'Kindness', day: 'Jul 4', tall: false },
  { src: 'https://let-there-be-lights.org/picture/Peace-Cultivated.jpg', title: 'Peace Cultivated', day: 'Aug 27', tall: true },
]

export default function GalleryPreview() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Collect all revealable refs
  const allRefs = [eyebrowRef, titleRef, ctaRef]
  useScrollReveal(allRefs)

  // Separate observer for card refs (they're in an array)
  useScrollReveal(
    cardRefs.current
      .filter((el): el is HTMLAnchorElement => el !== null)
      .map(el => ({ current: el }))
  )

  const handleTouch = useCallback((index: number) => {
    cardRefs.current.forEach((card, i) => {
      if (i !== index) card?.classList.remove('touch-active')
    })
    cardRefs.current[index]?.classList.toggle('touch-active')
  }, [])

  return (
    <section id="gallery_preview" className="gallery-preview">
      <div className="container">
        <p ref={eyebrowRef} className="section-eyebrow reveal">From the Collection</p>
        <h2 ref={titleRef} className="gallery-preview__title reveal">
          Open any day.<br /><em>Find your light.</em>
        </h2>

        <div className="gallery-preview__grid" id="galleryGrid">
          {GALLERY_IMAGES.map((img, i) => (
            <a
              key={img.title}
              ref={el => { cardRefs.current[i] = el }}
              href="https://let-there-be-lights.org/biblegallery/gallery"
              className={`gallery-card${img.tall ? ' gallery-card--tall' : ''} reveal`}
              onTouchStart={() => handleTouch(i)}
            >
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-card__overlay">
                <span className="gallery-card__title">{img.title}</span>
                <span className="gallery-card__day">{img.day}</span>
              </div>
            </a>
          ))}
        </div>

        <div ref={ctaRef} className="gallery-preview__cta-wrap reveal">
          <a href="https://let-there-be-lights.org/biblegallery/gallery" className="gallery-preview__cta">
            View All 365 →
          </a>
        </div>
      </div>
    </section>
  )
}
