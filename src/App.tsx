import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis.ts'
import Nav from './components/Nav.tsx'
import Footer from './components/Footer.tsx'
import HomePage from './pages/HomePage.tsx'
import AboutPage from './pages/AboutPage.tsx'

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
