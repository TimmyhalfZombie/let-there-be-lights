import React from 'react'

export interface AppStoreButtonsProps {
  playStoreUrl?: string
  appStoreUrl?: string
  className?: string
  style?: React.CSSProperties
}

export default function AppStoreButtons({
  playStoreUrl = '#',
  appStoreUrl = '#',
  className = '',
  style
}: AppStoreButtonsProps) {
  return (
    <div className={`app-links-row ${className}`.trim()} style={style}>
      <a href={playStoreUrl} className="app-store-btn">
        <div className="app-store-btn__icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <div className="app-store-btn__text">
          <span className="app-store-btn__sub">Get it on</span>
          <span className="app-store-btn__main">Google Play</span>
        </div>
      </a>

      <a href={appStoreUrl} className="app-store-btn">
        <div className="app-store-btn__icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
        </div>
        <div className="app-store-btn__text">
          <span className="app-store-btn__sub">Download on the</span>
          <span className="app-store-btn__main">App Store</span>
        </div>
      </a>
    </div>
  )
}
