import { ImageResponse } from 'next/og'
import { siteName } from '@/lib/seo'

export const alt = 'OnlyMath - Curated mathematics resources and tools'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#f8fafc',
          color: '#111827',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#2563eb',
              color: 'white',
              fontSize: 64,
              fontWeight: 700
            }}
          >
            M
          </div>
          <div style={{ fontSize: 42, fontWeight: 700 }}>{siteName}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            Curated Mathematics Resources
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: '#475569', lineHeight: 1.35 }}>
            Courses, tools, formulas, branches, and examples for deeper math learning.
          </div>
        </div>
      </div>
    ),
    size
  )
}
