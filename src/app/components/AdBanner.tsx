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
      // @ts-ignore
      if (window.adsbygoogle && typeof window.adsbygoogle.loaded !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.log('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-banner ${className}`}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}