import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLenis } from './hooks/useLenis.ts'
import { playHeroEntrance } from './heroAnimation.ts'
import Nav from './components/home/Nav.tsx'
import Footer from './components/home/Footer.tsx'
import HomePage from './pages/HomePage.tsx'
import AboutPage from './pages/AboutPage.tsx'

// On every fresh page load / reload, we always show the hero animation first
// then redirect to home. This flag tracks if intro has finished.
let introComplete = false

function AppRoutes() {
  const location = useLocation()
  const [ready, setReady] = useState(introComplete)

  useEffect(() => {
    if (!introComplete) {
      // Force scroll to top and play hero entrance
      window.scrollTo(0, 0)
      playHeroEntrance()
      introComplete = true
      setReady(true)
    }
  }, [])

  // On fresh load, if we're not on /, redirect to / for the hero animation
  if (!ready && location.pathname !== '/') {
    return <Navigate to="/" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Nav />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}
