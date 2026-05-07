import { useState, useEffect, useCallback } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <nav
      id="nav"
      className={`nav${scrolled ? ' scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <a href="/" className="nav__logo">Let There Be Lights</a>

      <button
        className={`nav__hamburger${menuOpen ? ' active' : ''}`}
        id="navHamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>

      <ul className={`nav__links${menuOpen ? ' open' : ''}`} id="navLinks">
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#gallery_preview" onClick={closeMenu}>Gallery</a></li>
        <li><a href="https://let-there-be-lights.org/site/contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  )
}
