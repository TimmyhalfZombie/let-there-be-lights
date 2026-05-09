import React from 'react'

export interface AppStoreButtonsProps {
  playStoreUrl?: string
  appStoreUrl?: string
  className?: string
  style?: React.CSSProperties
  showExploreGallery?: boolean
  galleryUrl?: string
}

export default function AppStoreButtons({
  playStoreUrl = '#',
  appStoreUrl = '#',
  className = '',
  style,
  showExploreGallery = false,
  galleryUrl = 'https://let-there-be-lights.org/biblegallery/gallery'
}: AppStoreButtonsProps) {
  return (
    <>
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
            <span className="app-store-btn__sub">Download on</span>
            <span className="app-store-btn__main">App Store</span>
          </div>
        </a>
      </div>

      {showExploreGallery && (
        <div className="app-links-secondary">
          <div className="app-links-line"></div>
          <a href={galleryUrl} className="about__cta about__cta--secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="external-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Explore the Gallery
          </a>
        </div>
      )}
    </>
  )
}

export function ExploreGalleryButton({
  galleryUrl = 'https://let-there-be-lights.org/biblegallery/gallery',
  className = '',
  style
}: { galleryUrl?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`app-links-secondary ${className}`.trim()} style={style}>
      <div className="app-links-line"></div>
      <a href={galleryUrl} className="about__cta about__cta--secondary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="external-icon">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Explore the Gallery
      </a>
    </div>
  )
}

