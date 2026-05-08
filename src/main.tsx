import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
