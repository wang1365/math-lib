'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  className?: string
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
}

export default function AdBanner({ 
  className = '', 
  slot, 
  format = 'auto',
  responsive = true 
}: AdBannerProps) {
  useEffect(() => {
    try {
      const w = window as any
      ;(w.adsbygoogle = w.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div className={`ad-banner ${className}`}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9789961264819993"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}
