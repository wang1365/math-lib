'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    const gtag = (window as any).gtag
    if (typeof gtag === 'function' && gaId) {
      gtag('config', gaId, { page_path: url })
    }
  }, [gaId, pathname, searchParams])

  return null
}
