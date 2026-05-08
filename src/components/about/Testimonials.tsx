const TESTIMONIALS = [
  {
    quote: 'This book abounds with words of wisdom from the greatest source of light, Jesus Christ, who said: \u2018I am the Light of the World\u2026he who follows me will have the light of life.\u2019 In this ever increasingly darkening world, this book has a timely message.',
    name: 'Rev. Samuel Capaque, BTh',
    credential: 'Baptist Bible Seminary and Institute',
  },
  {
    quote: 'In this new book you will discover that man\u2019s sublime ideas, his moral concepts and principles, have their equal or higher counterparts in the old, Holy Book, called the Bible. As you read, may this book be a source of light and inspiration.',
    name: 'Manette Monteclaro',
    credential: 'Master\u2019s in Christian Education, Northern Baptist Theological Seminary, Chicago, Illinois',
  },
  {
    quote: 'I am amazed by this unique book containing wise quotes complemented by Bible verses. It will doubtless be a great daily source of enlightenment and upliftment to its readers.',
    name: 'Mirzah Torres',
    credential: 'BS Communication, UP Los Ba\u00f1os \u2014 Founder, Connective Language Training Center',
  },
  {
    quote: 'This book is an extraordinary compilation of famous quotes from distinguished people, creatively juxtaposed with Bible verses. Read it daily, and it will surprise you to see that many of what they have quoted seemed to have been derived from the Bible.',
    name: 'Dale Arriola',
    credential: 'UST, College of Engineering, 1986',
  },
]

export default function AboutTestimonials() {
  return (
    <section className="ap-testimonials">
      <div className="container">
        <span className="ap-eyebrow ap-testimonials__label ab-reveal">What People Say</span>
        <div className="ap-testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="ap-test-card ab-reveal" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="ap-test-card__mark" aria-hidden="true">&ldquo;</span>
              <p className="ap-test-card__quote">{t.quote}</p>
              <div className="ap-test-card__footer">
                <span className="ap-test-card__name">{t.name}</span>
                <span className="ap-test-card__cred">{t.credential}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
