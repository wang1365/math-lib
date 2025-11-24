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
      // @ts-expect-error: The push method is not defined on the adsbygoogle array
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      // @ts-expect-error: The push method is not defined on the adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || []
      // Queue will be processed once the script loads
    }
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
