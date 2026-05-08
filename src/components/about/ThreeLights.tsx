const THREE_LIGHTS = [
  {
    number: '01',
    title: 'The Light of Man\u2019s Wisdom',
    body: 'Our own knowledge increases when augmented by the wisdom of others. President Woodrow Wilson once said: \u2018I not only use all the brains that I have, but all that I can borrow.\u2019 Sir Isaac Newton acknowledged that the wisdom of those who preceded him illuminated his way when he declared: \u2018If I can see further, it is by standing on the shoulders of giants.\u2019',
  },
  {
    number: '02',
    title: 'The Light of a Photograph',
    body: 'The word \u2018photo\u2019 comes from a Greek word meaning \u2018light.\u2019 Johann Wolfgang von Goethe, the most influential and perhaps the greatest German writer of all, suggests that: \u2018A man should\u2026see a fine picture every day of his life in order that worldly cares may not obliterate the sense of the beautiful which God has implanted in the human soul.\u2019',
  },
  {
    number: '03',
    title: 'The Light of God\u2019s Wisdom',
    body: 'Gleaned from the immortal books of the Bible, this light bears the brightest glow of all. \u2018The grass withers, the flower fades, but the word of our God stands forever.\u2019 \u2014 Isaiah 40:8. Abraham Lincoln called the Bible the best book God has given to man. Ronald Reagan declared: \u2018Within the covers of the Bible are the answers to all the problems men face.\u2019 A thousand years before Christ, King David wrote: \u2018Thy word is a lamp unto my feet, and a light unto my path.\u2019 \u2014 Psalm 119:105',
  },
]

export default function AboutThreeLights() {
  return (
    <section className="ap-lights">
      <div className="container">
        <span className="ap-eyebrow ap-lights__label ab-reveal">The Three Lights</span>
        <div className="ap-lights__list">
          {THREE_LIGHTS.map((item) => (
            <div className="ap-lights__item ab-reveal" key={item.number}>
              <div className="ap-lights__left">
                <span className="ap-lights__num">{item.number}</span>
                <h3 className="ap-lights__title">{item.title}</h3>
              </div>
              <div className="ap-lights__rule" aria-hidden="true" />
              <div className="ap-lights__right">
                <p className="ap-lights__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
